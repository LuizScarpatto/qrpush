const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const dbPath = process.env.DB_PATH;

// Ensure the db directory exists
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Open or create the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Failed to connect to SQLite:', err.message);
  } else {
    console.log(`✅ Connected to SQLite at ${dbPath}`);
    checkAndCreateTables();
  }
});

// Check if table exists and create if not
function checkAndCreateTables() {
  db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='qrcodes';`, (err, row) => {
    if (err) {
      console.error('❌ Error checking table:', err.message);
      return;
    }

    if (row) {
      console.log('ℹ️ Table "qrcodes" already exists');
    } else {
      db.run(`
        CREATE TABLE qrcodes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          data TEXT NOT NULL,
          type TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `, (err) => {
        if (err) {
          console.error('❌ Failed to create table:', err.message);
        } else {
          console.log('✅ Table "qrcodes" created successfully');
        }
      });
    }
  });
}

module.exports = db;
