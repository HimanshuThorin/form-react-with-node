const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); //important

mongoose.connect("mongodb://localhost:27017/coderDB");

const coderSchema = new mongoose.Schema({
    fullName: String,
    email: String 
})

const coderModel = mongoose.model("coderCollection", coderSchema);

app.get("/", function(req, res){
  
   coderModel.find({}, function(err, result){
    if(!err){
        res.json({result})
    }
   })
})

app.post("/", function(req, res){
    console.log(req.body)
    const coder = new coderModel({
        fullName: req.body.userInfo.fullName,
        email: req.body.userInfo.email
    });
    coder.save(function(err){
        if(!err){
            console.log("saved successfully")
        }
    });
   
});



app.listen(5000, function(){
    console.log("server listening to port 5000")
})