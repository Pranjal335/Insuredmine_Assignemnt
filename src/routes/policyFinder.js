const express = require('express');
const router = express.Router();
const {searchPolicyByUsername} = require('../controllers/policy.controller');

router.get('/search' , searchPolicyByUsername);

module.exports = router;