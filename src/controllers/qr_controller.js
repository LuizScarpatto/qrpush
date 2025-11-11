const pool = require('../db');

const createQRCode = async (req, res) => {
  const { data, type } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO qrcodes (data, type) VALUES ($1, $2) RETURNING *',
      [data, type]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createQRCode };
