const { Schema, model, mongoose } = require("mongoose");

const companySchema = new Schema({
  companyname: {
    type: "String",
    require: true,
  },
  title: {
    type: "String",
    require: true,
  },
  description: {
    type: "String",
    require: true,
  },
  imageUrl: {
    type: "String",
    require: true,
  },
});

const company = new model("companydata", companySchema);
module.exports = company;
