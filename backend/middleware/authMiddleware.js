const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let tocken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get tocken from header
      tocken = req.headers.authorization.split(" ")[1]; //[1] use for get the tocken only

      // Verify token
      const decodeed = jwt.verify(tocken, process.env.JWT_SECRET);

      //   Get user from the token
      req.user = await User.findById(decodeed.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!tocken) {
    res.status(401);
    throw new Error("Not authorized, no tocken");
  }
});

module.exports = {
  protect,
};
