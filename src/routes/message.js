const express = require('express');
const router = express.Router();
const {storeMessage } = require('../controllers/message.comtroller');

router.post('/store-message', storeMessage);

module.exports = router;