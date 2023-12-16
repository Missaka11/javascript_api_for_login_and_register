//create routes
const express = require("express");
const router = express.Router();
const {
  getStory,
  updateStory,
  postStory,
  deleteStory,
} = require("../controllers/storyController");
const { protect } = require("../middleware/authMiddleware");

// router.get("/", getStory);
// router.post("/", postStory);
// Insted of above lines we can use below line for clean the code

router.route("/").get(protect, getStory).post(protect, postStory);

// router.put("/:id", updateStory);
// router.delete("/:id", deleteStory);

router.route("/:id").put(protect, updateStory).delete(protect, deleteStory);
// Using this "protect" we can protect the data and it triggers the authMiddleware.js 
module.exports = router;
