const mongoose = require("mongoose");
const toDoListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toDoList: [
      {
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
        dueDate: {
          type: Date,
        },
        updated: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ToDoList = mongoose.model("ToDoList", toDoListSchema);
module.exports = ToDoList;
