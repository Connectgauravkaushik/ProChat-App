import starredMessages from "../images/starredchat.png";
import block from "../images/block.png";
import Deleted from "../images/delete.png";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const userProfile = useSelector((store) => store.loggedUserSlice.loggedUser);

  return (
    <>
      <div class="h-[800px] max-w-sm bg-gray-800 text-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-1 ">
        <div class="flex justify-end px-4 pt-4"></div>
        <div class="flex flex-col items-center pb-10 ">
          <img
            class="w-48 h-36 mb-3 rounded-full shadow-lg"
            src={userProfile.pic}
            alt="Bonnieimage"
          />
          <h5 class="mb-1 text-xl font-medium text-white dark:text-white">
            {userProfile.name}
          </h5>
          <span class="text-sm text-gray-300 dark:text-gray-400">
           {userProfile.email}
          </span>
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
                      <img className="w-8 h-8 invert" src={block} alt=""></img>
                      <p class=" text-red-600 font-bold text-base truncate dark:text-white mt-2 ml-12">
                        Block user
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <nav class="border-gray-700 bg-gray-700 dark:bg-gray-700 dark:border-gray-700 mt-3 rounded-t-2xl w-[360px]">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <div
                class="hidden w-full md:block md:w-auto"
                id="navbar-solid-bg"
              >
                <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                  <li>
                    <a
                      href=""
                      class="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                      aria-current="page"
                    >
                      Images
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Videos
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Docs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div class="grid gap-4">
            <div>
              <img
                class=" ml-3 h-auto w-[360px] rounded-b-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
                alt=""
              ></img>
            </div>
            <div class="grid grid-cols-4 gap-4 ml-3 mr-3">
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
                  alt=""
                ></img>
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
                  alt=""
                ></img>
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                  alt=""
                ></img>
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
