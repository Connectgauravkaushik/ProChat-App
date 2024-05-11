import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebarSlice";
import userSlice from "./userSlice";
import userChatSlice from "./userChatSlice";
import messageSlice from "./messageSlice";
import notificationSlice from "./notificationSlice";

const appStore = configureStore(
    {
        reducer: {
            sidebarSlice: sidebarSlice,
            loggedUserSlice: userSlice,
            userChatSlice:userChatSlice,
            messageSlice:messageSlice,
            notificationSlice:notificationSlice
        }

    }
);

export default appStore;