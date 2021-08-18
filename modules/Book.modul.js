const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  email: String,
  description: String,
  status: String,
  title: String,
});

const book = mongoose.model("Book", bookSchema);

module.exports = book;
