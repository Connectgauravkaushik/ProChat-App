import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "login",
  initialState: {
    loggedUser: null,
    users: null,
    searchResult: null,
    addUserResult: null,
  },
  reducers: {
    showLoginUser: (state, action) => {
      state.loggedUser = action.payload;
    },
    addUser: (state, action) => {
      state.users = action.payload;
    },
    addUserSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    removeSearchResult: (state, action) => {
      state.searchResult = null;
    },
    addUserInGroup: (state, action) => {
      state.addUserResult = action.payload;
    },
    removeSearchResults: (state, action) => {
      state.addUserResult = null;
    },
  },
});

export const {
  showLoginUser,
  addUser,
  addUserSearchResult,
  removeSearchResult,
  addUserInGroup,
  removeSearchResults
} = userSlice.actions;

export default userSlice.reducer;
