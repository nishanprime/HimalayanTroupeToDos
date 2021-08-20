const ToDoList = require("../models/toDoListModel");
const asyncHandler = require("express-async-handler");

const getToDoList= asyncHandler(async (req,res)=>{
    console.log(req.user)
    const allToDos = await ToDoList.find({});
    res.status(200).json({ todos: allToDos });
})

module.exports={
    getToDoList
}