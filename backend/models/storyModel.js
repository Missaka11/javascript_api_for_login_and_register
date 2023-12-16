const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

const storySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add atext value"],
    },
  },
  {
    timeStamp: true,
  }
);

module.exports = mongoose.model("stories", storySchema);
