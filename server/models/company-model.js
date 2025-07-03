const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  email: { type: String, required: true, unique: true },
  industry: { type: String },
  contact: { type: String },
  description: { type: String },
  // Add other fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
