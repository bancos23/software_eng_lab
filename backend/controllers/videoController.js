const db = require('../models/db');
const path = require('path');

exports.getAllVideos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM videos');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

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