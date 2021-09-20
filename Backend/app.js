const express = require("express");

const app =express();
// const User = require("./Models/user");
const mongoose= require("mongoose");
const user = require("./Routes/user");

mongoose.connect("mongodb+srv://user1:LKgrW0I5TQ7jWiur@cluster0.ylsjs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to Database");
    })
    .catch(()=>{
      console.log("Connection Failed");
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  app.use('/api/user',user)

module.exports = app;