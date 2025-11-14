require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const qrcodeRoutes = require('./routes/qrcodeRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/qrcode', qrcodeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

