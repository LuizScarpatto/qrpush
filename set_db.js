const { Client } = require('pg');
require('dotenv').config();

const dbName = process.env.DB_NAME;

const createDatabase = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
  });

  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname='${dbName}'`);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`✅ Database "${dbName}" created`);
    } else {
      console.log(`ℹ️ Database "${dbName}" already exists`);
    }
  } catch (err) {
    console.error('❌ Error creating database:', err);
  } finally {
    await client.end();
  }
};

const createTables = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: dbName,
  });

  try {
    await client.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS qrcodes (
        id SERIAL PRIMARY KEY,
        data TEXT NOT NULL,
        type VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Tables created successfully');
  } catch (err) {
    console.error('❌ Error creating tables:', err);
  } finally {
    await client.end();
  }
};

// Run both steps
(async () => {
  await createDatabase();
  await createTables();
})();
