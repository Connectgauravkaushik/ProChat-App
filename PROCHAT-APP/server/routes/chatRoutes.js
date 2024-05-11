const express = require("express");
const { protectedRoute } = require("../middlewares/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  adduserToGroup,
  removeFromGroup,
} = require("../controllers/chatController");

const router = express.Router();

router.route("/chats").post(protectedRoute, accessChat);
router.route("/chats").get(protectedRoute, fetchChats);
router.route("/group").post(protectedRoute, createGroupChat);
router.route("/rename").put(protectedRoute, renameGroup);
router.route("/groupadd").put(protectedRoute, adduserToGroup);
router.route("/groupremove").put(protectedRoute, removeFromGroup);
module.exports = router;
