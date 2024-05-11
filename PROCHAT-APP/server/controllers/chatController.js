const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModels");

const accessChat = expressAsyncHandler(async (req, res) => {
  // API FOR ONE-ON-ONE CHAT
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(401);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "fullname pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(402);
      throw new Error(error.message);
    }
  }
});

// here just check for the logged in user and find all the chats for that person
const fetchChats = expressAsyncHandler(async (req, res) => {
  try {
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
          .populate("users", "-password")
          .populate("groupAdmin", "-password")
          .populate("latestMessage")
          .sort({ updatedAt: -1 })
          .then(async (results) => {
              results = await User.populate(results, {
                  path: "latestMessage.sender",
                  select: "name pic email",
              });
              res.status(200).json(results);
          });
  } catch (error) {
      res.status(400);
      throw new Error(error.message);
  }
});

const createGroupChat = expressAsyncHandler(async (req, res) => {
  // no of user in group and name of the group
  if (!req.body.users || !req.body.name) {
    return res.status(401).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user); // req.user will be the logged in user

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = expressAsyncHandler(async (req, res) => {
  // chat ID and new Chat Name
  const { chatId, chatName } = req.body;

  // finding it by an Id and updating the Name
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

const adduserToGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const addingUsers = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!addingUsers) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(addingUsers);
  }
});

const removeFromGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removedUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!removedUser) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removedUser);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  adduserToGroup,
  removeFromGroup,
};
