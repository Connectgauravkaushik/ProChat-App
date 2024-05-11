const express = require("express");
const user = require("../models/userModels");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");

const registerUser = expressAsyncHandler(async (req, res) => {
    const { fullname, email, password, pic } = req.body;

    // all fields are filled up or not
    if (!fullname || !email || !password) {
        res.status(400);
        throw new Error("please Enter all the Fields");
    }

    //  find by Email if user is present or not
    const userExist = await user.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error("User already Exists!!");
    }

    const createNewUser = await user.create({
        fullname,
        email,
        password,
        pic
    });

    if (createNewUser) {
        res.status(201).json({
            _id: createNewUser._id,
            fullname: createNewUser.fullname,
            email: createNewUser.email,
            pic: createNewUser.pic,
            token: generateToken(createNewUser._id)

        });

    } else {
        res.status(400);
        throw new Error("Invalid username and password");
    }


});

const authenticateUserCredentials = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const User = await user.findOne({ email });

    if (User && (await User.validPassword(password))) {
        res.status(201).json({
            _id: User._id,
            name: User.fullname,
            email: User.email,
            pic: User.pic,
            token: generateToken(User._id)

        });
    } else {
        res.status(401);
        throw new Error("Invalid Username & Password");
    }

});

const getAllUsers = expressAsyncHandler(async (req, res) => {
    if (req.query.search === "") {
        res.send("cannot fetch the empty users");
    } else {
        const searchKeyword = req.query.search ? {
            /*
             - $or:ifferent types of logical query operators and $or operator is one of them. 
             This operator is used to perform logical OR operation on the array of two or more expressions and select 
             or retrieve only those documents that match at least one of the given expression in the array
    
             - $options: "i" it is used for case insensitivity to match upper and lower cases.
    
             - $regex : regular expressions are used for pattern matching, which is basically for findings strings within documents.
             Sometimes when retrieving documents in a collection, you may not know exactly what the exact Field value to search for. 
             Hence, one can use regular expressions to assist in retrieving data based on pattern matching search values.
    
             - 
            */
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        } : {};

        // search the user baseed on searchkeyword , but it will not search the logged in user for that use $ne mean non equality operator 

        const Users = await user.find(searchKeyword).find({ _id: { $ne: req.user._id } });

        res.send(Users);
    }



});

module.exports = { registerUser, authenticateUserCredentials, getAllUsers };