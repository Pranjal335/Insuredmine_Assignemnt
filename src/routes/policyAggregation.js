const express = require('express');
const router = express.Router();
const { getAggregatedPoliciesByUser } = require('../controllers/aggregation.controller');

router.get('/policies/aggregate-by-user', getAggregatedPoliciesByUser);

module.exports = router;
