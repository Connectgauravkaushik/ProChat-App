import { useSelector } from "react-redux";
import SideBarIcons from "./sideBar";
import ChatSection from "./chatSection";
import Notifications from "./Notifications";
import UserChat from "./UserChat";
import UserProfile from "./useProfile";
import GroupsChat from "./groupsChat";
import userImage from "../images/userImage.png";
import ChatProfileInfo from "./chatProfileInfo";

const ChatPage = () => {
  const userchats = useSelector((store) => store.sidebarSlice.userchats);
  const showUserInfo = useSelector((store) => store.sidebarSlice.UserInfo);
  const showGroupsChat = useSelector((store) => store.sidebarSlice.userGroups);
  const userForChat = useSelector((store) => store?.userChatSlice?.userChatId);
  const showUserProfileInfo = useSelector(
    (store) => store.sidebarSlice.showUserProfileInfo
  );

  const ShowNotification = useSelector(
    (store) => store.sidebarSlice.notification
  );

  return (
    <>
      <div className="inline-flex overflow-hidden relative z-30">
        <div className="w-20 h-14">
          <SideBarIcons />
        </div>
        <div className="w-96 h-14 ">
          {userchats && <ChatSection />}
          {ShowNotification && <Notifications />}
          {showGroupsChat && <GroupsChat />}
        </div>
        <div
          className={
            showUserInfo || showUserProfileInfo
              ? "w-[49.8rem] ml-[6px] h-[800px] mt-2"
              : "w-[74.2rem] ml-[6px] h-[800px] mt-2"
          }
        >
          {userForChat === null ? (
            <div className="text-center ">
              <img src={userImage} className="w-96 ml-96" alt=""></img>
              <div className="-mt-44">
                <h2 className="font-bold text-6xl ">
                  <span className="text-[#231FE6]">Pro</span>Chat Web{" "}
                </h2>
                <h3 className="mt-3 text-xl ">Send and Receive Message</h3>
              </div>

              <h3 className=" text-xl text-gray-400 font-bold mt-44">
                Your personal Messages are end-to-end encrypted
              </h3>
            </div>
          ) : (
            <UserChat />
          )}
        </div>
        {showUserInfo && (
          <div className="w-[25rem]  h-[800px] mt-2">
            <UserProfile />
          </div>
        )}
        {showUserProfileInfo && (
          <div className="w-[25rem]  h-[800px] mt-2">
            <ChatProfileInfo />
          </div>
        )}
      </div>
    </>
  );
};

export default ChatPage;
