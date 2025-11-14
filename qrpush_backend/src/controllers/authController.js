const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  db.run(query, [name, email, hash], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID, name, email });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  });
};
