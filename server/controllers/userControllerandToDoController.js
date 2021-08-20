const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const ToDoList = require("../models/toDoListModel");
const { generateToken } = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { username, email, name, password } = req.body;
  console.log("I am in");
  if (
    name.length === 0 ||
    email.length === 0 ||
    username.length === 0 ||
    password.length === 0
  ) {
    res.status(400);
    throw new Error("Make sure you enter all values correctly");
  }
  const userExists =
    (await User.findOne({ email })) || (await User.findOne({ username }));
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, username });
  const userToDoList = await ToDoList.insertMany({
    user: user._id,
    toDoList: [],
  });
  console.log(user);
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      todoListId: userToDoList[0]._id,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    const toDoList = await ToDoList.find({ user: user._id });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      todoListId: toDoList[0]._id,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

//PRIVATE ROUTE
//ONLY LOGGED IN AND RIGHT USER CAN EDIT
//HIS/HER TODOS
const updateToDos = asyncHandler(async (req, res) => {
  const {
    shallEdit = false,
    shallDelete = false,
    toDoListId,
    dataId,
    complete,
  } = req.body;
  const user = await User.findById(req.user._id);
  if (shallDelete) {
    console.log("Hi1");

    const deletedToDo = await ToDoList.findOneAndUpdate(
      {
        _id: toDoListId,
      },
      {
        $pull: { toDoList: { _id: dataId } },
      }
    );
    const delItem = {
      deletedItem: deletedToDo.toDoList.filter((id) => id._id == dataId),
    };
    console.log("Hi");
    console.log(delItem);
    res.status(200);
    res.send(delItem);
  } else {
    if (shallEdit) {
      const prevData = await ToDoList.findById(toDoListId);
      console.log(req.body);
      const requiredData = await prevData.toDoList.filter(
        (data) => data._id == dataId
      );
      console.log("hi");
      if (user) {
        const updatedItem = await ToDoList.findOneAndUpdate(
          {
            _id: toDoListId,
            "toDoList._id": dataId,
          },

          {
            $set: {
              "toDoList.$.title": requiredData[0].title,
              "toDoList.$.content": requiredData[0].content,
              "toDoList.$.updated": Date.now(),
              "toDoList.$.complete": complete,
            },
          },
          { new: true }
        );
        const recentlyCompletedItem = {
          recentlyCompleted: updatedItem.toDoList.filter(
            (id) => id._id == dataId
          ),
        };
        res.status(200).send(recentlyCompletedItem);
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    } else {
      res.status(401);
      throw new Error("Not valid input");
    }
  }
});

//PRIVATE ROUTE
//ONLY LOGGEDIN USER CAN PERFORM ACTION
const addToDos = asyncHandler(async (req, res) => {
  const { title, content, createNow, toDoListId, dueDate } = req.body;
  // throw new Error("Not valid Data")
  if (createNow && title.length > 0 && content.length > 0) {
    // console.log(req.body)
    const user = await User.findById(req.user._id);
    if (user) {
      // const list=await ToDoList.findById(toDoListId)
      // console.log(list)
      const addedToList = await ToDoList.updateOne(
        { _id: toDoListId },
        {
          $push: {
            toDoList: {
              complete: false,
              created: Date.now(),
              updated: Date.now(),
              dueDate: dueDate,
              title: title,
              content: content,
            },
          },
        }
      );
      // console.log(addedToList)
      const newUpdatedTodo = await ToDoList.findById(toDoListId);
      const lastItem =
        newUpdatedTodo.toDoList[newUpdatedTodo?.toDoList.length - 1];
      res.json(lastItem);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } else {
    res.status(401);
    throw new Error("Invalid entry.Make sure title and content are not empty");
  }
});

//PRIVATE ROUTE
//ONLY LOGGED IN USER CAN VIEW
//AND CAN ONLY VIEW HIS/HER Todos
const mytodos = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const mytodoList = await ToDoList.find({ user: user._id });
    res.json(mytodoList[0].toDoList.reverse());
    // res.json({
    //   name: user.name,
    //   email: user.email,
    //   username: user.username,
    //   toDoListsID: mytodoList[0]._id,
    //   toDoLists: mytodoList[0].toDoList,
    //   createdAtUpdatedAt: {
    //     createdAt: mytodoList[0].createdAt,
    //     updatedAt: mytodoList[0].updatedAt,
    //   },
    // });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { authUser, mytodos, registerUser, updateToDos, addToDos };
