
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const propertyRouter = require("./Router/property");
const cors = require("cors");
const userRouter = require("./Router/user");

const app = express();

app.use(cors({}));

app.use(bodyParser.json());


mongoose.connect("mongodb+srv://satyapalmechworld:axN0ykTi1TcZ18ED@cluster0.qkhyapj.mongodb.net/Rentify?retryWrites=true&w=majority").then(res=>{
    console.log("Connected to Database Successfully");
}).catch(err=>{
    console.log("Connection failed");
})


app.use("/prop",propertyRouter);
app.use("/user",userRouter);
app.listen(5000,()=>{
    console.log("listening at port 5000")
});