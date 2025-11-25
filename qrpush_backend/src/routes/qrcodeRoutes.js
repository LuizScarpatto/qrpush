const express = require('express');
const router = express.Router();
const qrcodeController = require('../controllers/qrcodeController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/create', authenticateToken, qrcodeController.createQRCode);
router.get(
  '/qrcodes/:user_id',
  authenticateToken,
  qrcodeController.listUserQRCodes,
);

router.get('/:id', authenticateToken, qrcodeController.getQRCode);

router.get('/:id/image', authenticateToken, qrcodeController.getQRCodeImage);

router.get('/:id/imagepng', authenticateToken, qrcodeController.getQRCodePNG);

module.exports = router;
