const express = require("express");
const { authenticateUserCredentials, registerUser, getAllUsers } = require("../controllers/userController");
const { protectedRoute } = require("../middlewares/authMiddleware");

const router = express.Router();

// route for signup user along with the get request to search users along with the middleware which is token authroize 
router.route("/signUp").post(registerUser).get(protectedRoute, getAllUsers); 
router.route("/login").post(authenticateUserCredentials);

module.exports = router;