import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  addUserSearchResult,
  removeSearchResult,
  removeSearchResults,
} from "../utils/userSlice";
import { UseSearchUserData } from "../Custom-hooks/useSearchUserData";
import axios from "axios";
import { adduserChatInfo, createUserChat } from "../utils/userChatSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addMessages } from "../utils/messageSlice";

const ChatSection = () => {
  const [show, setShow] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(true);
  const [searhQuery, setSearchQuery] = useState("");
  const [Query, setQuery] = useState("");
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState([]);
  const [chatId, setChatId] = useState();
  const [userProfiles, setUserProfiles] = useState();

  const dispatch = useDispatch();
  const usertoken = useSelector((store) => store.loggedUserSlice.loggedUser);
  const userProfile = useSelector((store) => store.loggedUserSlice.loggedUser);
  const getUsers = useSelector((store) => store?.loggedUserSlice?.users);
  const userForChat = useSelector((store) => store?.userChatSlice?.userChat);

  const getSearchResult = useSelector(
    (store) => store?.loggedUserSlice?.searchResult
  );
  const getCreateGroupSearchResult = useSelector(
    (store) => store?.loggedUserSlice?.addUserResult
  );

  UseSearchUserData(Query);

  // CREATING ONE-ON-ONE CHAT

  const CreateChat = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${usertoken.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `/api/chat/chats`,
        { userId: chatId },
        config
      );

      getAllUsers();
    } catch (error) {}
  };

  useEffect(() => {
    CreateChat();
  }, [chatId]);

  const showModal = () => {
    setShow(true);
  };

  // GETTING ALL THE USERS DATA
  const getAllUsers = async () => {
    try {
      await fetch("/api/chat/chats", {
        method: "get",
        headers: {
          Authorization: `Bearer ${usertoken?.token}`,
        },
      })
        .then((result) => result.json())
        .then((data) => dispatch(addUser(data)));
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [show, Query]);

  // CREATING PERSONAL GROUPS
  const UseCreateGroup = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${usertoken?.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupName,
          users: JSON.stringify(users.map((u) => u._id)),
        },
        config
      );
      getAllUsers();
      setShow(false);
      toast.success("Group Created !!", {
        position: "top-left",
      });
    } catch (error) {}
  };

  // SEARCHING USERS FROM DATABASE AS PER THE QUERY
  const searchUser = () => {
    if(searhQuery===""){
      dispatch(removeSearchResult());
      setShowSearchResult(true);
    }
    try {
      fetch(`/api/user/signUp?search=${searhQuery}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${usertoken?.token}`,
        },
      })
        .then((result) => result.json())
        .then((res) => 
          dispatch(addUserSearchResult(res))
      
      );
    } catch (error) {
      
    }

  };

  useEffect(() => {
    // ADDING THE DEBOUNCING METHOD
    const searchUsers = setTimeout(() => {
      searchUser();
    }, 500);

    return () => {
      clearTimeout(searchUsers);
    };
  }, [searhQuery]);

  // GETTING ALL THE MESSAGES AS PER THE NEED
  const getAllMessages = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${usertoken?.token}`,
      },
    };
    await fetch(`/api/message/${userForChat?._id}`, config)
      .then((res) => res.json())
      .then((data) => dispatch(addMessages(data)));
  };

  useEffect(() => {
    getAllMessages();
  }, [userProfiles, userForChat]);

  const showUserProfileHandler = () => {
    dispatch(createUserChat(userProfiles));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      showUserProfileHandler();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [userProfiles]);

  if (getUsers === null) {
    return;
  }

  if (searhQuery === "") {
    dispatch(removeSearchResult());
  }

  if (Query === "") {
    dispatch(removeSearchResults());
  }
  if (chatId === null) {
    return;
  }

  return (
    <>
      <aside
        id="logo-sidebar"
        class="static left-16 z-40 w-96 h-screen transition-transform -translate-x-full sm:translate-x-0 "
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 ">
          <div class="flex justify-between items-center ps-2.5 mb-5">
            <div class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white text-[#231FE6]">
              Messages
            </div>
            <div>
              <button
                onClick={showModal}
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                class="block text-white bg-[#231FE6] hover:bg-[#231FE6] focus:ring-4 focus:outline-none mt-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Create Group
              </button>
            </div>
          </div>

          <form class="flex items-center max-w-sm mx-auto">
            <label for="simple-search" class="sr-only">
              Search
            </label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search users for chat....."
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
            </div>
          </form>

          <ul class="relative z-40 divide-y divide-gray-200 dark:divide-gray-700 mt-6">
            {getUsers?.map(
              (user) =>
                user.isGroupChat === false &&
                user.users.map((u) =>
                  u._id === userProfile._id ? (
                    ""
                  ) : (
                    <li
                      class="py-3 sm:py-4 bg-white hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setUserProfiles(u);
                        dispatch(adduserChatInfo(user));
                        getAllMessages();
                      }}
                    >
                      <div class="flex items-center">
                        <div class="flex-shrink-0">
                          <img
                            class="w-20 h-16 rounded-full"
                            src={u.pic}
                            alt="Neilimage"
                          ></img>
                        </div>
                        <div class="flex-1 min-w-0 ms-4">
                          <p class="text-base font-bold text-gray-900 truncate dark:text-white">
                            {u.fullname}
                          </p>
                          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </li>
                  )
                )
            )}
          </ul>

          {/* search Result */}
          {getSearchResult !== null && showSearchResult ===true && (
            <div className="relative z-50 border border-gray-300 w-[360px] h-auto -mt-[400px] bg-white ">
              <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                {getSearchResult.map((searchResult) => (
                  <li
                    class="py-3 sm:py-4 ml-1 mr-1 hover:bg-gray-200"
                    onClick={() => {
                      setChatId(searchResult);
                      setShowSearchResult(false);
                    }}
                  >
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
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>

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
                Create a New Group
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
                  Group Name
                </label>
                <input
                  onChange={(e) => setGroupName(e.target.value)}
                  type="text"
                  id="default-input"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              </div>
              <div class="mb-6">
                <label
                  for="default-input"
                  class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Add Users
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

            {getCreateGroupSearchResult !== null && (
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

            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 mt-2">
              <button
                onClick={UseCreateGroup}
                data-modal-hide="default-modal"
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create group
              </button>
              <button
                onClick={() => setShow(false)}
                data-modal-hide="default-modal"
                type="button"
                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer autoClose={1000} />
    </>
  );
};

export default ChatSection;
