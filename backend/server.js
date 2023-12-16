const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const colors = require("colors");
const connectDB = require("./config/db");

const port = process.env.PORT || 4000;
connectDB();
const app = express();

//These are the middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//
app.use("/stories", require("./routes/storiesRoutes")); //call to the route
app.use("/users", require("./routes/userRoutes"));

app.use(errorHandler); //override the difault express error handler

app.listen(port, () => console.log(`Server listening to port ${port}`));
