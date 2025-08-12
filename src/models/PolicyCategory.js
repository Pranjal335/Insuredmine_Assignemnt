const mongoose = require('mongoose');

const PolicyCategorySchema = new mongoose.Schema({
  category_name: { type: String, required: true, index: true }
}, { timestamps: true });

module.exports = mongoose.model('PolicyCategory', PolicyCategorySchema);