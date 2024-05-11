import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Notifications = () => {
  const [ShowNotification, setShowNotifications] = useState(false);

  const getNotifications = useSelector(
    (store) => store.notificationSlice.messageNotify
  );

  const userProfile = useSelector((store) => store?.loggedUserSlice?.users);
  const ShowNotifications = useSelector(
    (store) => store.sidebarSlice.notification
  );

  useEffect(() => {
    userProfile.filter((n) => {
      n.users.filter((i) =>
        i._id === getNotifications?.sender?._id
          ? setShowNotifications(true)
          : setShowNotifications(false)
      );
    });

    console.log(getNotifications?.content);
  }, [ShowNotifications]);

  return (
    <>
      <div
        id="dropdownNotification"
        class="z-20  w-96  block  max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
        aria-labelledby="dropdownNotificationButton"
      >
        <div class="block px-4 py-2  text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white text-xl font-bold">
          Notifications
        </div>
{  getNotifications !==null ?
        (<div class="w-96 h-[732px] divide-y divide-gray-100 dark:divide-gray-700">
          <div class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
            <div class="flex-shrink-0">
              <img
                class="rounded-full w-16 h-12"
                src={getNotifications?.sender?.pic}
                alt="Jeseimage"
              ></img>
              <div class="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                <svg
                  class="w-2 h-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                  <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                </svg>
              </div>
            </div>
            <div class="w-full ps-3">
              <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                New message from{" "}
                <span class="font-semibold text-gray-900 dark:text-white">
                  {getNotifications?.sender?.fullname}
                </span>
                : {getNotifications?.content}
              </div>
              <div class="text-xs text-blue-600 dark:text-blue-500">
                a few moments ago
              </div>
            </div>
          </div>
        </div>
        ) : (
          <div class="w-96 h-[732px] divide-y divide-gray-100 dark:divide-gray-700">
            <div class=" px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
              <div class="text-center mt-60 ">
                <h2 className="text-2xl font-bold">No latest Message!!</h2>
              </div>
            </div>
          </div>
        ) }

        <div class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
          <div class="inline-flex items-center font-bold ">
            <svg
              class="w-4 h-4 me-2 dark:text-gray-400 text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            View all
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
