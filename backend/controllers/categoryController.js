const db = require('../models/db');

/** * GET /api/categories
 * * Fetches all categories from the database.
 */
exports.getAllCategories = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/** * POST /api/categories
 * * Creates a new category entry in the database.
 * Expects a JSON body with fields:
 * - name: String, the name of the category
 */
exports.createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name)
    return res.status(400).json({ error: 'All fields are required' });

  try {
    const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
    res.status(201).json({ id: result.insertId, name });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/** * PUT /api/categories/:id
 * * Updates an existing category in the database.
 * Expects a JSON body with fields:
 * * - name: String, the new name of the category
 * The category ID is provided in the URL parameter.
 * Returns a 404 error if the category is not found.
 */
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name)
    return res.status(400).json({ error: 'All fields are required' });

  try {
    const [result] = await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Category not found' });

    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/** * DELETE /api/categories/:id
 * * Deletes a category from the database.
 * The category ID is provided in the URL parameter.
 * Returns a 404 error if the category is not found.
 */
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Category not found' });

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}