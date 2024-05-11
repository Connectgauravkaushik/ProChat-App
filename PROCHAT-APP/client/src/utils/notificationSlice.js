import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name:"notifications",
    initialState:{
       messageNotify:null,
    },
    reducers:{
     addMessageNotification : (state , action)=> {
        state.messageNotify = action.payload;
     }
    }
});

export const {addMessageNotification} = notificationSlice.actions;
export default notificationSlice.reducer;