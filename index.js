//creating express server
console.log("App started");

const express = require("express");  //import express
console.log("Still working");

// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config(); 
const path = require('path'); // For resolving file paths
console.log("env file imported");
console.log(process.env.TEST_ENV); // Debugging step //access variables defined in .env

const authRoutes = require("./src/routes/authRoutes"); //import the API routes
const userRoutes = require("./src/routes/userRoutes"); //import user route


const dbConnect = require("./src/config/dbConnect");

dbConnect();

const app = express();

//Middleware

app.use(express.json());  //get JSON data

//Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Example route to test the static file
//app.get('/', (req, res) => {
 //   res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
//});



//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//Start the server
const PORT = process.env.PORT || 7002; //process, to get value from env file
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})






    
   
   
   
   
   //change to adminPage upon 'login' button click
    
   // var button = document.getElementById("loginBtn");
   // button.addEventListener("click", (e) => {
      //  e.preventDefault();  // Prevent form submission
     //   console.log("Button click works");
     //   window.location.href = "adminHome.html";  // Redirect to adminHome.html
  //  });
