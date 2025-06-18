const db = require('../models/db');


/** * POST /api/login
 * * Authenticates a user based on username and password.
 * Expects a JSON body with fields:
 * - user: String, the username of the user
 * - passwd: String, the password of the user
 */
exports.login = async (req, res) => {
  const { user, passwd } = req.body;

  const [rows] = await db.query(
    'SELECT * FROM users WHERE username = ?',
    [user]
  );

  if(rows.length === 0)
    return res.status(401).json({ error: 'Invalid credentials' });

  const foundUser = rows[0];

  const passwordMatch = foundUser.password === passwd; // WIP: should use any encryption for password
  if(!passwordMatch)
    return res.status(401).json({ error: 'Invalid credentials' });

  const sessionId = Math.random().toString(36).substring(2, 15);
  res.json({
    sessionId: sessionId,
    role: foundUser.role
  });
};

/** * POST /api/logout
 * * Logs out the user by invalidating the session.
 * This is a placeholder function as session management is not implemented.
 */
exports.logout = async (req, res) => {
  res.json({ message: 'Logout successful' });
}
