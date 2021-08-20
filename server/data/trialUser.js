const bcrypt = require("bcryptjs");
const users = [
  {
    name: "Nishan Thapa",
    email: "abc@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    username: "nishan123",
  },
  {
    name: "Maya Pun",
    email: "123@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    username: "maya123",
  },
  {
    name: "Akhil",
    email: "def@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    username: "akhil123",
  },
];
module.exports = users;
