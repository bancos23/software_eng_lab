const db = require('../models/db');
const path = require('path');
const fs = require('fs');

/**
 * GET /api/videos
 * * Fetches all videos from the database.
 */
exports.getAllVideos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
      ID as id,
      title,
      category_id AS categoryId,
      file_path AS filePath,
      file_size AS fileSize
      FROM videos
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


/**
 * POST /api/videos
 * * Creates a new video entry in the database.
 * Expects a multipart/form-data request with fields:
 * - title: String, the title of the video
 */
exports.createVideo = async (req, res) => {
    const { title, categoryId } = req.body;
    const file = req.file;

    if(!title || !categoryId || !file) {
        if(file) fs.unlinkSync(file.path);
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const relPath = path.relative(path.join(__dirname, '..'), file.path).replace(/\\/g, '/');
        const [result] = await db.query('INSERT INTO videos (title, file_path, file_size, category_id) VALUES (?, ?, ?, ?)', [title, relPath, file.size, categoryId]);

        res.status(201).json({ id: result.insertId, title, filePath: relPath, fileSize: file.size, categoryId });
    } catch(err) {
        console.error('Error creating video:', err);
        if(file) fs.unlinkSync(file.path);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * PUT /api/videos/:id
 * * Updates an existing video in the database.
 * Expects a multipart/form-data request with fields:
 * - title: String, the new title of the video
 * - categoryId: Number, the new category ID of the video
 * The video ID is provided in the URL parameter.
 * Returns a 404 error if the video is not found.
 */
exports.updateVideo = async (req, res) => {
    const { id } = req.params;
    const { title, categoryId } = req.body;
    const file = req.file;

    if(!title || !categoryId) {
        if(file) fs.unlinkSync(file.path);
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        let sql = 'UPDATE videos SET title = ?, category_id = ?';
        let data = [title, categoryId];
        let relPath;

        if(file) {
          const relPath = path.relative(path.join(__dirname, '..'), file.path).replace(/\\/g, '/');
          sql += ', file_path = ?, file_size = ?';
          data.push(relPath, file.size);
        }

        sql += ' WHERE id = ?';
        data.push(id);

        const [result] = await db.query(sql, data);

        if(result.affectedRows === 0) {
            if(file) fs.unlinkSync(file.path);
            return res.status(404).json({ error: 'Video not found' });
        }

        const response = {
          message: 'Video updated successfully',
          id,
          title, 
          categoryId
        };

        if(file) {
          response.filePath = relPath;
          response.fileSize = file.size;
        }

        res.json(response);
        //res.json({ message: 'Video updated successfully', id, title, filePath: relPath, fileSize: file ? file.size : null, categoryId });
    } catch(err) {
        console.error('Error updating video:', err);
        if(file) fs.unlinkSync(file.path);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * DELETE /api/videos/:id
 * * Deletes a video from the database.
 * The video ID is provided in the URL parameter.
 * Returns a 404 error if the video is not found.
 */
exports.deleteVideo = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM videos WHERE id = ?', [id]);

        if(result.affectedRows === 0) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.json({ message: 'Video deleted successfully' });
    } catch(err) {
        console.error('Error deleting video:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}