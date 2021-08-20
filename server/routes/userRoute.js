const express = require("express");
const {
  authUser,
  mytodos,
  registerUser,
  updateToDos,
  addToDos
} = require("../controllers/userControllerandToDoController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

//Public route for time being
// this (router.route("/").get(getToDoList)) is similar to: router.get("/", getToDoList);
router.route("/login").post(authUser);
router.route("/").post(registerUser);
router.route("/mytodos").get(protect, mytodos).post(protect, addToDos).put(protect,updateToDos);
// router.route("/:username/todos")
module.exports = router;
