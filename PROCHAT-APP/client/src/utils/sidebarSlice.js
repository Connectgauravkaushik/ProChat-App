import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    userchats: true,
    notification: false,
    userProfile: false,
    userGroups: false,
    UserInfo: false,
    showUserInfos: false,
    showUserProfileInfo: false,
  },
  reducers: {
    ShowUserChats: (state, action) => {
      state.userchats = action.payload;
    },
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
    ShowUserProfile: (state, action) => {
      state.userchats = action.payload;
    },
    showUserGroups: (state, action) => {
      state.userGroups = action.payload;
    },
    showUserInfo: (state, action) => {
      state.UserInfo = action.payload;
    },
    showUserInfos: (state, action) => {
      state.showUserInfos = action.payload;
    },
    showUserProfile: (state, action) => {
      state.showUserProfileInfo = action.payload;
    },
  },
});

export const {
  ShowUserChats,
  showNotification,
  ShowUserProfile,
  showUserGroups,
  showUserInfo,
  showUserProfile,
  showUserInfos
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
