const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
