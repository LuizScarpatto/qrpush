const express = require('express');
const db = require('./src/initDb');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/qrcode/create', (req, res) => {
  const { data, type } = req.body;
  db.run(
    'INSERT INTO qrcodes (data, type) VALUES (?, ?)',
    [data, type],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, data, type });
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 QRPUSH backend running on port ${PORT}`);
});
