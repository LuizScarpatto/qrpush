const db = require('./User');

db.run(`CREATE TABLE IF NOT EXISTS qrcodes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  title TEXT,
  content TEXT,
  color TEXT,
  logo TEXT,
  access_count INTEGER DEFAULT 0,
  FOREIGN KEY(user_id) REFERENCES users(id)
)`);

module.exports = db;
