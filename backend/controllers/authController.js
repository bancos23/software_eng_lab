const db = require('../models/db');

exports.login = async (req, res) => {
  const { user, passwd } = req.body;

  const [rows] = await db.query(
    'SELECT * FROM users WHERE username = ?',
    [user]
  );

  if(rows.length === 0)
    return res.status(401).json({ error: 'Invalid credentials' });

  const foundUser = rows[0];

  const passwordMatch = foundUser.password === passwd; // WIP
  if(!passwordMatch)
    return res.status(401).json({ error: 'Invalid credentials' });

  const sessionId = Math.random().toString(36).substring(2, 15);
  res.json({
    sessionId: sessionId,
    role: foundUser.role
  });
};

exports.logout = async (req, res) => {
  res.json({ message: 'Logout successful' });
}
