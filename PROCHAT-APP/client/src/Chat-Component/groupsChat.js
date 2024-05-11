import profileImage from "../images/profile4.png";
import { useDispatch, useSelector } from "react-redux";
import { adduserChatInfo, createUserChat } from "../utils/userChatSlice";

const GroupsChat = () => {
  const getGroupsUsers = useSelector((store) => store?.loggedUserSlice?.users);
  const dispatch = useDispatch();

  return (
    <>
      <aside
        id="logo-sidebar"
        class="static left-16 z-40 w-96 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 ">
          <a href="https://flowbite.com/" class="flex items-center ps-2.5 mb-5">
            <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white text-[#231FE6]">
              Group Messages
            </span>
          </a>

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
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search branch name..."
                required
              />
            </div>
          </form>
          <ul class="divide-y divide-gray-200 dark:divide-gray-700 mt-6">
            {getGroupsUsers?.map(
              (user) =>
                user.isGroupChat === true && (
                  <li
                    class="py-3 sm:py-4 bg-white hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      dispatch(createUserChat(user));
                      dispatch(adduserChatInfo(user));
                    }}
                  >
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <img
                          class="w-20 h-16 rounded-full"
                          src={profileImage}
                          alt="Neilimage"
                        ></img>
                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-base font-bold  text-gray-900 truncate dark:text-white">
                          {user.chatName}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          {user.groupAdmin.email}
                        </p>
                      </div>
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default GroupsChat;
