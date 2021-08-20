const mongoose = require("mongoose");
const toDoSchema = new mongoose.Schema({
  complete: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});
const ToDo = mongoose.model("ToDo", toDoSchema);
module.exports = ToDo;
