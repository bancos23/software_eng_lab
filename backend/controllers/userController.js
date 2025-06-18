const db = require('../models/db');


/** * GET /api/users
 * * Fetches all users from the database.
*/
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/** * POST /api/users
 * * Creates a new user entry in the database.
 * Expects a JSON body with fields:
 * - username: String, the username of the user
 * - password: String, the password of the user
 * - role: String, the role of the user (e.g., 'admin', 'user')
*/
exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role)
    return res.status(400).json({ error: 'All fields are required' });

  try {
    const [result] = await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role]);
    res.status(201).json({ id: result.insertId, username });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/** * PUT /api/users/:id
 * * Updates an existing user in the database.
 * Expects a JSON body with fields:
 * - username: String, the new username of the user
 * - password: String, the new password of the user
 * - role: String, the new role of the user (e.g., 'admin', 'user')
 * The user ID is provided in the URL parameter.
 * Returns a 404 error if the user is not found.
*/
exports.updateUser = async (req, res) => {
    const {id } = req.params;
    const { username, password, role } = req.body;
    
    try {
        const [result] = await db.query('UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?', [username, password, role, id]);
        
        if (result.affectedRows === 0)
            return res.status(404).json({ error: 'User not found' });
        
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/** * DELETE /api/users/:id
 * * Deletes a user from the database.  
 * The user ID is provided in the URL parameter.
 * Returns a 404 error if the user is not found.
*/

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        if (result.affectedRows === 0) 
            return res.status(404).json({ error: 'User not found' });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}