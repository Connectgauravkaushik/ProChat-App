import { useDispatch } from "react-redux";
import {
  showNotification,
  ShowUserChats,
  showUserGroups,
  showUserInfo,
  showUserProfile,
} from "../utils/sidebarSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBarIcons = () => {
  const [show, setShow] = useState();
  const [logout, setLogout] = useState();
  const [showChatTooltip, setShowChatTooltip] = useState(false);
  const [showNotificationsTooltip, setShowNotificationsTooltip] =
    useState(false);
  const [showGroupTooltip, setShowGroupTooltip] = useState(false);
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showChatHandler = () => {
    dispatch(showNotification(false));
    dispatch(showUserGroups(false));
    dispatch(ShowUserChats(true));
  };
  const ShowNotificationHandler = () => {
    dispatch(ShowUserChats(false));
    dispatch(showUserGroups(false));
    dispatch(showNotification(true));
  };
  const showGroupChatHandler = () => {
    dispatch(ShowUserChats(false));
    dispatch(showNotification(false));
    dispatch(showUserGroups(true));
  };

  const UseInfohandler = () => {
    setShow(!show);
    dispatch(showUserInfo(show));
    dispatch(showUserProfile(false))
  };

  const logoutHandler = () => {
    navigate("/login", { replace: true });
  };

  return (
    <>
      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-20 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <li
              onClick={showChatHandler}
              onMouseOver={() => setShowChatTooltip(true)}
              onMouseLeave={() => setShowChatTooltip(false)}
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white ml-[10px] mt-[20px] hover:text-[#231FE6]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z" />
              </svg>
              {showChatTooltip && (
                <div class=" ml-12 mt-3 p-1 w-32 absolute z-10 visible block px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-1  dark:bg-gray-700">
                  <p className="text-white w-32 px-8 ">Chats </p>
                  <div class="float-left -mt-[27px] " data-popper-arrow></div>
                </div>
              )}
            </li>
            <li
              onClick={ShowNotificationHandler}
              onMouseOver={() => setShowNotificationsTooltip(true)}
              onMouseLeave={() => setShowNotificationsTooltip(false)}
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white ml-[10px] mt-[36px] hover:text-[#231FE6]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M15.133 10.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.944.944 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.39A1.001 1.001 0 1 1 4.854 3.8a7.431 7.431 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 15.146 3.8a1 1 0 0 1 1.471-1.354 9.425 9.425 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z" />
              </svg>
              {showNotificationsTooltip && (
                <div class=" ml-12 mt-3 p-1 w-32 absolute z-10 visible block px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-1  dark:bg-gray-700">
                  <p className="text-white w-32 px-2">Notifications </p>
                  <div class="float-left -mt-[27px] " data-popper-arrow></div>
                </div>
              )}
            </li>

            <li
              onClick={showGroupChatHandler}
              onMouseOver={() => setShowGroupTooltip(true)}
              onMouseLeave={() => setShowGroupTooltip(false)}
            >
              <svg
                className="w-14 h-8 text-gray-800 dark:text-white -ml-2 mt-[36px] hover:fill-[#231FE6]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <defs></defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="layer_1-2" data-name="layer 1">
                    <path
                      class="cls-1"
                      d="M37 48a11 11 0 1 1 11-11 11 11 0 0 1-11 11zm0-20a9 9 0 1 0 9 9 9 9 0 0 0-9-9zM10 27.25l-2-.11A16 16 0 0 1 14.65 15l1.17 1.62A13.94 13.94 0 0 0 10 27.25z"
                    />
                    <path
                      class="cls-1"
                      d="M24 44a16.08 16.08 0 0 1-4.83-.74l.61-1.91a14.13 14.13 0 0 0 8.44 0l.6 1.91A16 16 0 0 1 24 44zM38 27.25a13.91 13.91 0 0 0-5.8-10.61L33.35 15A15.91 15.91 0 0 1 40 27.14zM37 40c-2.21 0-4-2.24-4-5a3.71 3.71 0 0 1 4-4 3.71 3.71 0 0 1 4 4c0 2.76-1.79 5-4 5zm0-7c-1.79 0-2 1.14-2 2 0 1.6.93 3 2 3s2-1.4 2-3c0-.86-.21-2-2-2z"
                    />
                    <path
                      class="cls-1"
                      d="M44 45h-2v-3.31a1 1 0 0 0-.84-1L37 40l-4.17.7a1 1 0 0 0-.83 1V45h-2v-3.31a3 3 0 0 1 2.51-2.95l4.33-.74h.32l4.33.73A3 3 0 0 1 44 41.69zM24 22a11 11 0 1 1 11-11 11 11 0 0 1-11 11zm0-20a9 9 0 1 0 9 9 9 9 0 0 0-9-9z"
                    />
                    <path
                      class="cls-1"
                      d="M24 14c-2.21 0-4-2.24-4-5a3.71 3.71 0 0 1 4-4 3.71 3.71 0 0 1 4 4c0 2.76-1.79 5-4 5zm0-7c-1.79 0-2 1.14-2 2 0 1.6.93 3 2 3s2-1.4 2-3c0-.86-.21-2-2-2z"
                    />
                    <path
                      class="cls-1"
                      d="M31 19h-2v-3.31a1 1 0 0 0-.84-1L24 14l-4.17.7a1 1 0 0 0-.83 1V19h-2v-3.31a3 3 0 0 1 2.51-2.95l4.33-.74h.32l4.33.73A3 3 0 0 1 31 15.69zM11 48a11 11 0 1 1 11-11 11 11 0 0 1-11 11zm0-20a9 9 0 1 0 9 9 9 9 0 0 0-9-9z"
                    />
                    <path
                      class="cls-1"
                      d="M11 40c-2.21 0-4-2.24-4-5a3.71 3.71 0 0 1 4-4 3.71 3.71 0 0 1 4 4c0 2.76-1.79 5-4 5zm0-7c-1.79 0-2 1.14-2 2 0 1.6.93 3 2 3s2-1.4 2-3c0-.86-.21-2-2-2z"
                    />
                    <path
                      class="cls-1"
                      d="M18 45h-2v-3.31a1 1 0 0 0-.84-1L11 40l-4.17.7a1 1 0 0 0-.83 1V45H4v-3.31a3 3 0 0 1 2.51-2.95l4.33-.74h.32l4.33.73A3 3 0 0 1 18 41.69z"
                    />
                  </g>
                </g>
              </svg>
              {showGroupTooltip && (
                <div class=" ml-12 mt-3 p-1 w-32 absolute z-10 visible block px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-1  dark:bg-gray-700">
                  <p className="text-white w-32 px-2">Chat Groups </p>
                  <div class="float-left -mt-[27px]" data-popper-arrow></div>
                </div>
              )}
            </li>

            <li
              onClick={() => setLogout(true)}
              onMouseOver={() => setShowLogout(true)}
              onMouseLeave={() => setShowLogout(false)}
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white ml-[10px] mt-[490px] hover:text-[#231FE6]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                />
              </svg>
              {showLogout && (
                <div class=" ml-12 -mt-14 p-1 w-32 absolute z-10 visible block px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-1  dark:bg-gray-700">
                  <p className="text-white w-32 px-2">Logout </p>
                  <div class="float-left  -mt-[1px] " data-popper-arrow></div>
                </div>
              )}
            </li>

            <li
              onClick={UseInfohandler}
              onMouseOver={() => setShowProfileTooltip(true)}
              onMouseLeave={() => setShowProfileTooltip(false)}
            >
              <svg
                className="w-10 h-8 text-gray-800 dark:text-white mt-[50px] hover:fill-[#231FE6]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 29 29"
                id="user"
              >
                <path d="M14.5 2A12.514 12.514 0 0 0 2 14.5 12.521 12.521 0 0 0 14.5 27a12.5 12.5 0 0 0 0-25Zm7.603 19.713a8.48 8.48 0 0 0-15.199.008A10.367 10.367 0 0 1 4 14.5a10.5 10.5 0 0 1 21 0 10.368 10.368 0 0 1-2.897 7.213ZM14.5 7a4.5 4.5 0 1 0 4.5 4.5A4.5 4.5 0 0 0 14.5 7Z"></path>
              </svg>
              {showProfileTooltip && (
                <div class=" ml-12 -mt-14 p-1 w-32 absolute z-10 visible block px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-1  dark:bg-gray-700">
                  <p className="text-white w-32 px-2">Admin Profile </p>
                  <div class="float-left  -mt-[1px] " data-popper-arrow></div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </aside>

      <div
        id="default-modal"
        tabindex="-1"
        aria-hidden="true"
        class={
          logout
            ? "flex items-center justify-center fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 "
            : "fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4"
        }
      >
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="p-4 md:p-5 text-center">
              <svg
                class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
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
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to logout?
              </h3>
              <button
                onClick={logoutHandler}
                data-modal-hide="popup-modal"
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => setLogout(false)}
                data-modal-hide="popup-modal"
                type="button"
                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarIcons;
