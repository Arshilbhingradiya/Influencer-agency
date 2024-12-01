const { Schema, model, mongoose } = require("mongoose");

const influSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
  },
  followers: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true, // Optional field
  },
});

const influ = new model("infludata", influSchema);
module.exports = influ;
