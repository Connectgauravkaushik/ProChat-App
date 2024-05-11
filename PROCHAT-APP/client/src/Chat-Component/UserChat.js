import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UseSearchUserData } from "../Custom-hooks/useSearchUserData";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { showUserInfos, showUserProfile } from "../utils/sidebarSlice";
import { showUserInfo as info } from "../utils/sidebarSlice";
import Picker from "emoji-picker-react";
import { addMessages } from "../utils/messageSlice";
import io from "socket.io-client";
import ReactScrollToBottom from "react-scroll-to-bottom";
import profileImage from "../images/profile4.png";
import { addMessageNotification } from "../utils/notificationSlice";

const UserChat = () => {
  const [show, setShow] = useState(false);
  const [Query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [removeUsers, setRemoveUsers] = useState();
  const [groupName, setGroupName] = useState("");
  const [showOptions, setShowOptions] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);

  const onEmojiClick = (event) => {
    let sym = event.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setNewMessage(newMessage + emoji);
  };

  const socket = useMemo(() => io("http://localhost:8080/"), []);

  const showUserInfo = useSelector((store) => store?.sidebarSlice?.UserInfo);
  const showUserInfoes = useSelector(
    (store) => store?.sidebarSlice?.showUserProfileInfo
  );
  const userForChat = useSelector((store) => store?.userChatSlice?.userChat);
  const userForId = useSelector((store) => store?.userChatSlice?.userChatId);

  const userProfile = useSelector(
    (store) => store?.loggedUserSlice?.loggedUser
  );
  const usergroupChatUsers = useSelector(
    (store) => store?.userChatSlice?.userChat?.users
  );
  const getCreateGroupSearchResult = useSelector(
    (store) => store?.loggedUserSlice?.addUserResult
  );
  const usertoken = useSelector((store) => store.loggedUserSlice.loggedUser);
  const MessageSend = useSelector(
    (store) => store?.userChatSlice?.senderMessage
  );

  const dispatch = useDispatch();
  UseSearchUserData(Query);

  const showHandler = () => {
    setShowOptions(!showOptions);
  };

  const showProfileHandler = () => {
    dispatch(showUserProfile(true));
    dispatch(info(false));
    dispatch(showUserInfos(true));
    setShowOptions(false);
  };

  const getAllUsers = async () => {
    try {
      await fetch("/api/chat/chats", {
        method: "get",
        headers: {
          Authorization: `Bearer ${usertoken.token}`,
        },
      })
        .then((result) => result.json())
        .then((data) => dispatch(addUser(data)));
    } catch (error) {}
  };

  const updateGroupName = async () => {
    if (userProfile._id !== userForChat?.groupAdmin?._id) {
      alert("Only Admin is Allowed to update the name");
    } else {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${usertoken.token}`,
          },
        };
        const { data } = await axios.put(
          `/api/chat/rename`,
          {
            chatId: userForChat?._id,
            chatName: groupName,
          },
          config
        );

        getAllUsers();
        setGroupName("");
        setShow(false);
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  const groupRemove = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${usertoken.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: userForChat?._id,
          userId: removeUsers?._id,
        },
        config
      );
      getAllUsers();
      setShow(false);
    } catch (e) {}
  };

  const groupLeave = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${usertoken.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: userForChat?._id,
          userId: userForChat?.groupAdmin?._id,
        },
        config
      );
      getAllUsers();
      setShow(false);
    } catch (e) {}
  };

  const addUserInGroup = async () => {
    if (userProfile?._id !== userForChat?.groupAdmin?._id) {
    } else {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${usertoken.token}`,
          },
        };
        const { data } = await axios.put(
          `/api/chat/groupadd`,
          {
            chatId: userForChat?._id,
            userId: users.map((u) => u?._id),
          },
          config
        );
        getAllUsers();
      } catch (e) {}
    }
  };

  useEffect(() => {
    socket.on("connect", () => {});
    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages([...messages, data]);
      dispatch(addMessageNotification(data));
    });
  }, [messages]);

  useEffect(() => {
    groupRemove();
    getAllUsers();
  }, [removeUsers]);

  useEffect(() => {
    addUserInGroup();
  }, [users]);

  const sendMessage = async () => {
    if (newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${usertoken.token}`,
          },
        };
        const { data } = await axios.post(
          "/api/message/messages",
          {
            content: newMessage,
            chatId: userForChat?._id,
          },
          config
        );
        setNewMessage("");
        console.log("output", data);
        let roomId = userForId._id;
        socket.emit("user-message", { roomId, data });
        setMessages([...messages, data]);
        console.log(messages);
      } catch (error) {}
    }
  };

  const getAllMessages = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${usertoken.token}`,
      },
    };
    await fetch(`/api/message/${userForChat?._id}`, config)
      .then((res) => res.json())
      .then((data) => dispatch(addMessages(data)));
    let roomId = userForId._id;
    socket.emit("join-room", roomId);
  };

  useEffect(() => {
    getAllMessages();
  }, [newMessage, userForChat]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  if (userForChat === null) {
    return;
  }

  if (show === false) {
    users.length = [];
  }

  if (userProfile === null) {
    return;
  }

  return (
    <>
      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <ul
          class="flex justify-between flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
          id="defaultTab"
          data-tabs-toggle="#defaultTabContent"
          role="tablist"
        >
          <li class="py-2 sm:py-4 bg-gray-50 hover:bg-gray-100 cursor-pointer">
            <div class="flex items-center">
              <div class="flex-shrink-0 ml-5">
                <img
                  class="w-20 h-16 rounded-full"
                  src={userForChat?.pic || profileImage}
                  alt="Neilimage"
                ></img>
              </div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-base font-bold  text-gray-900 truncate dark:text-white">
                  {userForChat?.fullname || userForChat?.chatName}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  {userForChat?.email || userForChat?.groupAdmin?.email}
                </p>
              </div>
            </div>
          </li>

          <div
            id="dropdownDots"
            className={
              showOptions
                ? `absolute ${
                    showUserInfo || showUserInfoes ? "ml-[600px]" : "ml-[990px]"
                  } mt-16  z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`
                : "absolute hidden ml-[990px] mt-16  z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            }
          >
            <ul
              class="py-2  text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownMenuIconButton"
            >
              <li onClick={showProfileHandler}>
                <div class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  User Profile
                </div>
              </li>
             { userForId.isGroupChat === true &&  <li
                onClick={() => {
                  setShow(true);
                  setShowOptions(false);
                }}
              >
                <div
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </div>
              </li>}
            </ul>
          </div>

          <button
            onClick={showHandler}
            id="dropdownMenuIconHorizontalButton"
            data-dropdown-toggle="dropdownDotsHorizontal"
            class="inline-flex float-right mr-2 items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
        </ul>
        <div id="defaultTabContent">
          <ReactScrollToBottom className="h-[78vh]">
            {userForId.isGroupChat === false &&
            userForId?._id !== userForChat?._id ? (
              <div
                class=" bg-white rounded-lg md:p-8 dark:bg-gray-800  h-[78vh]"
                id="about"
                role="tabpanel"
                aria-labelledby="about-tab"
              >
                {messages.map((m) =>
                  userForId?._id !== m.chat?._id &&
                  userProfile?._id === m.sender?._id ? (
                    <div class="float-right w-full mt-10 ">
                      <div className="flex items-start gap-2.5 float-right ">
                        <img
                          class="w-14 h-10 rounded-full"
                          src={m?.sender?.pic}
                          alt="JeseImage"
                        ></img>
                        <div class="flex flex-col gap-1 w-full max-w-[320px]">
                          <div class="flex items-center space-x-2 rtl:space-x-reverse">
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">
                              {m?.sender?.fullname}
                            </span>
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                              11:46
                            </span>
                          </div>
                          <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-[#231FE6]  rounded-e-xl rounded-es-xl dark:bg-gray-700 ">
                            <p class="text-sm font-normal text-white dark:text-white">
                              {" "}
                              {m?.content || MessageSend?.content}
                            </p>
                          </div>
                          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Delivered
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    userForChat?._id === m.sender?._id && (
                      <div class="float-left w-full mt-10 ">
                        <div className="flex items-start gap-2.5 float-left ">
                          <img
                            class="w-14 h-10 rounded-full"
                            src={m?.sender?.pic}
                            alt="JeseImage"
                          ></img>
                          <div class="flex flex-col gap-1 w-full max-w-[320px]">
                            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                              <span class="text-sm font-semibold text-gray-900 dark:text-white">
                                {m?.sender?.fullname}
                              </span>
                              <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                11:46
                              </span>
                            </div>
                            <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-slate-200  rounded-e-xl rounded-es-xl dark:bg-gray-700 ">
                              <p class="text-sm font-normal text-black dark:text-white">
                                {" "}
                                {m?.content || MessageSend?.content}
                              </p>
                            </div>
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                              Delivered
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            ) : (
              <div
                class=" bg-white rounded-lg md:p-8 dark:bg-gray-800  h-[78vh]"
                id="about"
                role="tabpanel"
                aria-labelledby="about-tab"
              >
                {messages.map((m) =>
                  userForId?._id === m.chat?._id &&
                  userProfile?._id === m.sender?._id ? (
                    <div class="float-right w-full mt-10 ">
                      <div className="flex items-start gap-2.5 float-right ">
                        <img
                          class="w-14 h-10 rounded-full"
                          src={m?.sender?.pic}
                          alt="JeseImage"
                        ></img>
                        <div class="flex flex-col gap-1 w-full max-w-[320px]">
                          <div class="flex items-center space-x-2 rtl:space-x-reverse">
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">
                              {m?.sender?.fullname}
                            </span>
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                              11:46
                            </span>
                          </div>
                          <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-[#231FE6]  rounded-e-xl rounded-es-xl dark:bg-gray-700 ">
                            <p class="text-sm font-normal text-white dark:text-white">
                              {" "}
                              {m?.content || MessageSend?.content}
                            </p>
                          </div>
                          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Delivered
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    userForId?._id === m.chat?._id && (
                      <div class="float-left w-full mt-10 ">
                        <div className="flex items-start gap-2.5 float-left ">
                          <img
                            class="w-14 h-10 rounded-full"
                            src={m?.sender?.pic}
                            alt="JeseImage"
                          ></img>
                          <div class="flex flex-col gap-1 w-full max-w-[320px]">
                            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                              <span class="text-sm font-semibold text-gray-900 dark:text-white">
                                {m?.sender?.fullname}
                              </span>
                              <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                11:46
                              </span>
                            </div>
                            <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-slate-200  rounded-e-xl rounded-es-xl dark:bg-gray-700 ">
                              <p class="text-sm font-normal text-black dark:text-white">
                                {" "}
                                {m?.content || MessageSend?.content}
                              </p>
                            </div>
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                              Delivered
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            )}
          </ReactScrollToBottom>
        </div>

        <div className="border sticky ">
          <form onSubmit={(e) => e.preventDefault()}>
            <label for="chat" class="sr-only">
              Your message
            </label>
            <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
              <button
                type=""
                class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    fill="currentColor"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                </svg>
                <span class="sr-only">Upload image</span>
              </button>
              <button
                onClick={() => setShowEmoji(!showEmoji)}
                type="button"
                class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                  />
                </svg>
                <span class="sr-only">Add emoji</span>
              </button>
              <input
                onChange={typingHandler}
                value={newMessage}
                id="chat"
                rows="1"
                class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
              ></input>
              <button
                onClick={sendMessage}
                class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              >
                <svg
                  class="w-5 h-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span class="sr-only">Send message</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        id="default-modal"
        tabindex="-1"
        aria-hidden="true"
        class={
          show
            ? "flex items-center justify-center fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 "
            : "fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4"
        }
      >
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white ">
                Settings
              </h3>
              <button
                type="button"
                onClick={() => setShow(false)}
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="p-4 md:p-5 space-y-4">
              <div class="mb-6">
                <label
                  for="default-input"
                  class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Update Group Name
                </label>
                <div className="flex">
                  <input
                    onChange={(e) => setGroupName(e.target.value)}
                    type="text"
                    id="default-input"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[84%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></input>
                  <button
                    onClick={updateGroupName}
                    data-modal-hide="default-modal"
                    type="button"
                    class="text-white ml-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update
                  </button>
                </div>
              </div>
              <div class="mb-6">
                <label
                  for="default-input"
                  class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Add Users to group
                </label>
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  id="default-input"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              </div>
            </div>

            {users.length >= 0 &&
              users.map((u) => (
                <div
                  id="badge-dismiss-dark"
                  class="ml-6 inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-white bg-black rounded dark:bg-gray-700 dark:text-gray-300"
                >
                  {u.fullname}
                  <button
                    type="button"
                    class="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300"
                    data-dismiss-target="#badge-dismiss-dark"
                    aria-label="Remove"
                  >
                    <svg
                      class="w-2 h-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                      onClick={() => setRemoveUsers(u)}
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Remove badge</span>
                  </button>
                </div>
              ))}

            <div className="ml-5 mt-4 mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Group User:
            </div>

            {usergroupChatUsers?.map((u) => (
              <div
                id="badge-dismiss-dark"
                class="ml-6 inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-white bg-black rounded dark:bg-gray-700 dark:text-gray-300"
              >
                {u.fullname}
                <button
                  type="button"
                  class="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300"
                  data-dismiss-target="#badge-dismiss-dark"
                  aria-label="Remove"
                >
                  <svg
                    class="w-2 h-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                    onClick={() => setRemoveUsers(u)}
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Remove badge</span>
                </button>
              </div>
            ))}

            {Query === ""
              ? ""
              : getCreateGroupSearchResult !== null && (
                  <div className="relative z-50 border border-gray-300 w-[590px] h-44  bg-white ml-6 mt-2 overflow-y-scroll ">
                    <ul class="divide-y divide-gray-200 dark:divide-gray-700  ">
                      {getCreateGroupSearchResult.map((searchResult) => (
                        <li class="py-3 sm:py-4 ml-8 mr-2 ">
                          <div class="flex items-center">
                            <div class="flex-shrink-0">
                              <img
                                class="w-14 h-14 rounded-full"
                                src={searchResult.pic}
                                alt="Neilimage"
                              ></img>
                            </div>
                            <div class="flex-1 min-w-0 ms-4">
                              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {searchResult.fullname}
                              </p>
                              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                {searchResult.email}
                              </p>
                            </div>
                            <button
                              onClick={() => setUsers([...users, searchResult])}
                              data-modal-hide="default-modal"
                              type="button"
                              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Add user
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

            <div class=" p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 mt-2">
              <button
                onClick={groupLeave}
                data-modal-hide="default-modal"
                type="button"
                class="py-2.5 px-5 text-xl w-full font-medium text-white focus:outline-none bg-red-700 rounded-lg border border-gray-200 hover:bg-red-900 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Leave group
              </button>
            </div>
          </div>
        </div>
      </div>
      {showEmoji && (
        <Picker
          onEmojiClick={onEmojiClick}
          width="350px"
          height="350px"
          className="ml-10 -mt-[430px] relative z-50"
        />
      )}
    </>
  );
};

export default UserChat;
