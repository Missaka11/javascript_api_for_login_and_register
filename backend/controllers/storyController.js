// create route functions for clean the code more

const asyncHandler = require("express-async-handler");
const Story = require("../models/storyModel");

// @desc    Get stories
// @route   Get /stories
// @access  Private
const getStory = asyncHandler(async (req, res) => {
  const stories = await Story.find({ user: req.user.id }); // We can use this for get stories according to the user
  res.json(stories);
});

// @desc    Post stories
// @route   Post /stories
// @access  Private
const postStory = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text");
  }

  const story = await Story.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.json(story);
});

// @desc    Update stories
// @route   Update /stories
// @access  Private
const updateStory = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);

  if (!story) {
    res.status(400);
    throw new Error("Story not found");
  }

  const user = await UserActivation.findById(req.user.id);
  // Check for the user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the loged in user matches the story user
  if (story.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authori zed");
  }

  // Add new story body insted of old one
  const updatedStory = await Story.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedStory);
});

// @desc    Delete stories
// @route   Detele /stories
// @access  Private
const deleteStory = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);

  if (!story) {
    res.status(400);
    throw new Error("Story not found");
  }

  const user = await UserActivation.findById(req.user.id);
  // Check for the user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the loged in user matches the story user
  if (story.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authori zed");
  }

  await story.deleteOne(); //. remove() gives error. Une "deleteOne" insted of that

  res.json({ id: req.params.id });
});

module.exports = { getStory, postStory, updateStory, deleteStory };
