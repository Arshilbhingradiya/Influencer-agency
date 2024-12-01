const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const serviceSchema = new Schema({
  companyName: { type: String, require: true },
  email: { type: String, require: true },
  product: { type: String, require: true },
  price: { type: Number, require: true },
  requirement: { type: Number, require: true },
});

const Service = new model("service", serviceSchema);
module.exports = Service;
