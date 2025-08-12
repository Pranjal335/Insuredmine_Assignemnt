const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: {type: String, required: true, index: true},
    dob: {type: Date},
    address: {type: String},
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    phone: { type: String },
    email: { type: String, index: true },
    gender: { type: String },
    userType: { type: String },              
  }, { timestamps: true });

  module.exports = mongoose.model('User', UserSchema);