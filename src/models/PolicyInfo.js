const mongoose = require('mongoose');

const PolicyInfoSchema = new mongoose.Schema({
  policy_number: { type: String, required: true, index: true, unique: true },
  policy_start_date: { type: Date },
  policy_end_date: { type: Date },
  premium_amount: { type: Number },
  producer: { type: String },         // from CSV if exists
  agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCategory' },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCarrier' },
 
}, { timestamps: true });

module.exports = mongoose.model('PolicyInfo', PolicyInfoSchema);