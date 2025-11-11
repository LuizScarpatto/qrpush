const express = require('express');
const router = express.Router();
const { createQRCode } = require('../controllers/qrcodeController');

router.post('/create', createQRCode);

module.exports = router;