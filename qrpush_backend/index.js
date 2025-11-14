require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');
const qrcodeRoutes = require('./src/routes/qrcodeRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/qrcode', qrcodeRoutes);

app.listen(PORT, () => {
  console.log(`🚀 QRPUSH backend running on port ${PORT}`);
});

