// Create database connection
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connect ${conn.connection.host}`.cyan.underline); //after the backtick add the colors
  } catch (error) {
    console.log(error);
    process.exit(1); //exit from the process
  }
};

module.exports = connectDB;
