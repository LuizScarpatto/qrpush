const QRCode = require('qrcode');
const db = require('../database/db');

exports.createQRCode = (req, res) => {
  const user_id = req.user.id;
  const { title, content, color, logo } = req.body;

  const query = `INSERT INTO qrcodes (user_id, title, content, color, logo) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [user_id, title, content, color, logo], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
};

exports.getQRCode = (req, res) => {
  const { id } = req.params;

  db.get(`SELECT * FROM qrcodes WHERE id = ?`, [id], (err, qr) => {
    if (err || !qr) {
      return res.status(404).json({ error: 'QR Code not found' });
    }

    db.run(`UPDATE qrcodes SET access_count = access_count + 1 WHERE id = ?`, [id]);

    res.json(qr);
  });
};

exports.getQRCodeImage = (req, res) => {
  const { id } = req.params;

  db.get(`SELECT * FROM qrcodes WHERE id = ?`, [id], async (err, qr) => {
    if (err || !qr) {
      return res.status(404).json({ error: 'QR Code not found' });
    }

    try {
      const qrImage = await QRCode.toDataURL(qr.content);
      res.json({ ...qr, qrImage });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

exports.getQRCodePNG = (req, res) => {
  const { id } = req.params;

  db.get(`SELECT * FROM qrcodes WHERE id = ?`, [id], async (err, qr) => {
    if (err || !qr) {
      return res.status(404).json({ error: 'QR Code not found' });
    }

    try {
      const qrBuffer = await QRCode.toBuffer(qr.content || qr.data, { type: 'png' });

      res.setHeader('Content-Type', 'image/png');
      res.send(qrBuffer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

exports.listUserQRCodes = (req, res) => {
  const { user_id } = req.params;

  db.all(`SELECT * FROM qrcodes WHERE user_id = ?`, [user_id], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
};
