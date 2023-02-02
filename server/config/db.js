const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SchoolDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("Connected to MongoDB successfully!");
});



// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });
  
  // Create the User model
  const User = mongoose.model("User", userSchema);
  
  // Define the Login schema
  const loginSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  });
  
  // Create the Login model
  const Login = mongoose.model("Login", loginSchema);
  
  // Connect to the MongoDB database
  mongoose.connect("mongodb://localhost/mydb", { useNewUrlParser: true });
  
  // Insert test data into the User collection
  const user = new User({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123"
  });
  user.save();
  
  // Insert test data into the Login collection
  const login = new Login({
    email: "john.doe@example.com",
    password: "password123"
  });
  login.save();

register("John Doe", "john.doe@example.com", "password123");
module.exports = db;
