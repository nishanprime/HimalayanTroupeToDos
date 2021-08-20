require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const trialDataAkhil = require("./data/trialDataAkhil");
const trialDataNishan = require("./data/trialDataNishan");
const todoData = require("./data/trialDataNishan");
const userData = require("./data/trialUser");
const ToDoList = require("./models/toDoListModel");
const User = require("./models/userModel");
connectDB();

const importData = async () => {
  try {
    await User.deleteMany({});
    await ToDoList.deleteMany({});

    const createdUsers = await User.insertMany(userData);

    const nishanData = await ToDoList.insertMany({
      user: createdUsers[0]._id,
      toDoList: trialDataNishan,
    });
    const akhilData = await ToDoList.insertMany({
      user: createdUsers[2]._id,
      toDoList: trialDataAkhil,
    });
    
    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany({});
    await ToDoList.deleteMany({});
    console.log("Data destroyed");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

if(process.argv[2]==="-d"){
    destroyData()
}
else{
    importData()
}