require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  let header = req.headers.authorization;
  if (header && header.startsWith("Bearer")) {
    //   token=req.headers.authorization.slice
    try {
      token = header.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const currentUser=await User.findById(decoded.id).select("-password");
      req.user=currentUser
    } catch (error) {
      console.log(error.message);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
  next();
});

const onlyAdminCanAccess=asyncHandler(async (req,res,next)=>{
  let token;
  let header=req.headers.authorization;
  if (header && header.startsWith("Bearer")) {
    //   token=req.headers.authorization.slice
    try {
      token = header.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      // console.log(req.user.username)
      if(req.user.email!=="thapanishan9@gmail.com"){
        res.status(401);
        throw new Error("Not authorized")
      }
    } catch (error) {
      console.log(error.message);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
  next();
})
module.exports = { protect,onlyAdminCanAccess };
