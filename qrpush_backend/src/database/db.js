const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const dbPath = process.env.DB_PATH || './qrpush.db';
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  // QR Codes
  db.run(`
    CREATE TABLE IF NOT EXISTS qrcodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT,
      content TEXT,
      color TEXT,
      logo TEXT,
      access_count INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
});

module.exports = db;
