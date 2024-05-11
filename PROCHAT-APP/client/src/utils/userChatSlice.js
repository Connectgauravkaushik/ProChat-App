import { createSlice } from "@reduxjs/toolkit";

const userChatSlice = createSlice({
  name: "userChat",
  initialState: {
    userChat: null,
    senderMessage:null,
    userChatId:null
  },
  reducers: {
    createUserChat: (state, action) => {
        state.userChat = action.payload;
    },
    removeUserChat: (state, action) => {
      state.userChat = null;
  },
    addSenderMessage : (state , action) => {
      state.senderMessage = action.payload;
    }
    ,
    adduserChatInfo : (state , action) => {
      state.userChatId = action.payload;
    }
    ,
    removeuserChatInfo : (state , action) => {
      state.userChatId = null;
    }
  },
});


export const { createUserChat , addSenderMessage , adduserChatInfo , removeUserChat , removeuserChatInfo } = userChatSlice.actions;
export default userChatSlice.reducer;
