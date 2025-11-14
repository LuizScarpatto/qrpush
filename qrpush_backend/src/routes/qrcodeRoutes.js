const express = require('express');
const router = express.Router();
const qrcodeController = require('../controllers/qrcodeController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/create', authenticateToken, qrcodeController.createQRCode);
router.get('/user/:user_id', authenticateToken, qrcodeController.listUserQRCodes);

router.get('/:id', qrcodeController.getQRCode);

module.exports = router;
