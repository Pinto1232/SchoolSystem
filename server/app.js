const usersRouter = require("./routes/users");
const db = require('./config/db');
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Load environment variables
dotenv.config();
const port = process.env.PORT;
const dbUri = process.env.MONGODB_URI;
/* const jwtSecret = process.env.JWT_SECRET; */


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const connection = mongoose.connection;

// Add db object in the server
db.connect()
    .then(() => {
        console.log("Connected to database");
    })
    .catch(error => {
        console.error("Error connecting to database:", error);
});


// Create the Express app
const app = express();

// Parse JSON requests
app.use(express.json());
// Use the users router for all /users requests
app.use("/users", usersRouter);


connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});



