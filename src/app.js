const express = require('express');
const { connectDB } = require('./config/db');
const uploadRoutes = require('./routes/upload');
const policyRoutes = require('./routes/policyFinder');
const policyAggregationRoutes = require('./routes/policyAggregation');
const storeMessage = require('./routes/message');
const app = express();

connectDB();

app.use(express.json());

app.use('/api/upload', uploadRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api', policyAggregationRoutes);
app.use('/api', storeMessage);


module.exports = app;
