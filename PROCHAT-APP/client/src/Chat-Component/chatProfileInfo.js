import { useDispatch, useSelector } from "react-redux";
import starredMessages from "../images/starredchat.png";
import block from "../images/block.png";
import Deleted from "../images/delete.png";
import profileImage from "../images/profile4.png";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { showUserProfile } from "../utils/sidebarSlice";

const ChatProfileInfo = () => {
  const usergroupChatUsers = useSelector(
    (store) => store?.userChatSlice?.userChat
  );
  const usertoken = useSelector((store) => store.loggedUserSlice.loggedUser);
  const userForChat = useSelector((store) => store?.userChatSlice?.userChat);
  const dispatch = useDispatch();

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
    } catch (error) {
      alert("ERROR WHILE UPLOADING!!");
    }
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
      dispatch(showUserProfile(false));
    } catch (e) {}
  };

  return (
    <>
      <div class="h-[800px] max-w-sm bg-gray-800 text-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-1 ">
        <div class="flex justify-end px-4 pt-4"></div>
        <div class="flex flex-col items-center pb-10 ">
          <img
            class="w-48 h-36 mb-3 rounded-full shadow-lg"
            src={usergroupChatUsers?.pic || profileImage}
            alt="Bonnieimage"
          />
          <h5 class="mb-1 text-xl font-medium text-white dark:text-white">
            {usergroupChatUsers?.fullname || usergroupChatUsers?.chatName}
          </h5>
          <span class="text-sm text-gray-300 dark:text-gray-400">
            {usergroupChatUsers?.email}
          </span>

          {usergroupChatUsers?.groupAdmin ? (
            <div class="flex mt-4 md:mt-6 w-[95%]">
              <ul class="divide-y divide-gray-400 dark:divide-gray-700 border-b border-b-gray-600 w-full border-t border-t-gray-600">
                <li class="py-3 sm:py-4 hover:bg-gray-600 cursor-pointer ">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <img
                        class="w-20 h-16 rounded-full"
                        src={usergroupChatUsers?.groupAdmin?.pic}
                        alt="Neilimage"
                      ></img>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                      <p class="text-base font-bold  text-white truncate dark:text-white">
                        {usergroupChatUsers?.groupAdmin?.fullname} - Admin
                      </p>
                      <p class="text-sm text-white truncate dark:text-gray-400">
                        {usergroupChatUsers?.groupAdmin?.email}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <div class="flex mt-4 md:mt-6 w-[95%]">
                <ul class="divide-y divide-gray-200 dark:divide-gray-700 border-b border-b-gray-600 w-full border-t border-t-gray-600">
                  <li class="py-3 sm:py-4 text-center">
                    <div class="flex items-center">
                      <div class="flex-1 min-w-0 ms-4">
                        <div className="flex ">
                          <img
                            className="w-10 h-10 invert"
                            src={starredMessages}
                            alt=""
                          ></img>
                          <p class=" text-white font-bold text-base truncate dark:text-white mt-2 ml-10">
                            Starred messages
                          </p>
                        </div>

                        <div className="flex mt-5 ">
                          <img
                            className="w-8 h-8 invert hover:fill-[#231FE6]"
                            src={Deleted}
                            alt=""
                          ></img>
                          <p class=" text-white font-bold text-base truncate dark:text-white mt-2 ml-12 hover:text-[#231FE6] cursor-pointer">
                            Clear chats
                          </p>
                        </div>

                        <div className="flex mt-5">
                          <img
                            className="w-8 h-8 invert"
                            src={block}
                            alt=""
                          ></img>
                          <p class=" text-red-600 font-bold text-base truncate dark:text-white mt-2 ml-12">
                            Block user
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => dispatch(showUserProfile(false))}
                data-modal-hide="default-modal"
                type="button"
                class="text-white mt-60 w-64 ml-4 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-800 dark:hover:bg-red-800 dark:focus:ring-red-800"
              >
                Close
              </button>
            </>
          )}

          {usergroupChatUsers?.users && (
            <>
              <div className="mt-5 text-xl font-bold"> Group Users</div>
              <div
                class={
                  usergroupChatUsers?.users.length > 3
                    ? "flex mt-4 md:mt-6 w-[95%] h-80 overflow-y-scroll"
                    : "flex mt-4 md:mt-6 w-[95%]"
                }
              >
                <ul class="divide-y divide-gray-400 dark:divide-gray-700 border-b border-b-gray-600 w-full border-t border-t-gray-600">
                  {usergroupChatUsers?.users?.map((u) => (
                    <li class="py-3 sm:py-4 hover:bg-gray-600 cursor-pointer ">
                      <div class="flex items-center">
                        <div class="flex-shrink-0">
                          <img
                            class="w-20 h-16 rounded-full"
                            src={u?.pic}
                            alt="Neilimage"
                          ></img>
                        </div>
                        <div class="flex-1 min-w-0 ms-4">
                          <p class="text-base font-bold  text-white truncate dark:text-white">
                            {u?.fullname}
                          </p>
                          <p class="text-sm text-white truncate dark:text-gray-400">
                            {u?.email}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
        {usergroupChatUsers?.users && (
          <div className="flex">
            <button
              onClick={groupLeave}
              data-modal-hide="default-modal"
              type="button"
              class="text-white -mt-6 w-64 ml-4 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-800 dark:hover:bg-red-800 dark:focus:ring-red-800"
            >
              Leave Group
            </button>
            <button
              onClick={() => dispatch(showUserProfile(false))}
              data-modal-hide="default-modal"
              type="button"
              class="text-white -mt-6 w-64 ml-4 mr-3 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-800 dark:hover:bg-red-800 dark:focus:ring-red-800"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatProfileInfo;
