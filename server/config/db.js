require("dotenv").config();
console.log(process.env.MONGO_DB_URL)
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify:false
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("I am here\n");
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
