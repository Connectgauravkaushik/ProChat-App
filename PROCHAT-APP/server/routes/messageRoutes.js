const express = require("express");
const { protectedRoute } = require("../middlewares/authMiddleware");
const router = express.Router();
const {sendMessage , allMessage} = require("../controllers/messageController");


router.route("/messages").post(protectedRoute ,sendMessage);
router.route("/:chatId").get(protectedRoute ,allMessage);

module.exports = router;