const express = require("express");
const User = require("../Schema/userSchema");
const userRouter = express.Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



userRouter.post("/register",async (req, res) => {
    console.log(req.body)
    const {firstname,lastname,contact,email,password,type} =  req.body
    bcrypt.hash(password, 10).then(hashPass => { // encrypting password 10 times with bcrypt
       
        const userData = new User({
          firstname,
          lastname,
          contact,
          email,
          password:hashPass,
          type
        })
       
        // saving email and encrypted password to DB
        userData.save().then(result => {
            res.status(200).json({
                message: "User Created successfully!!",
                data: result,
            })
        }).catch(err => {
            // handle error if email is not found unique
            res.status(400).json({
                message: "Email already exist!!",
                errDesc: err
            })
        })
    }).catch(err => {
        res.status(500).json({
            message: "Internal Server Error!!"
        })
    })


})


userRouter.post("/login", async (req, res) => {
    
  console.log("login")
    const loginCred = req.body;
    User.findOne({ email: loginCred.email }).then(user => {
        if (user) {  
            //console.log(user)
            bcrypt.compare(loginCred.password, user.password).then(response => {
                
                if (response) {  
                    const jwtToken = jwt.sign({
                        email: user.email,
                        id: user._id,
                    },
                        "satya@123", {
                        expiresIn: "24h"
                    })
                    res.status(200).send({
                        message : "Login credential matched!!",
                        Token : jwtToken,
                       ID :user._id,
                       mail: user.email
                    })
                } else {
                    res.status(404).json({
                        message: "Email or password does not match!!"
                    })
                }
            })
        } else {
            res.status(400).json({
                message: "Email is not registered with us.."
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Internal server Error!!"
        })
    })
})

module.exports = userRouter;