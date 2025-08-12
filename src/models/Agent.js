const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
    name: {type: String, required: true, index: true}
},
{timestamp: true}
);

module.exports = mongoose.model('Agent', AgentSchema);