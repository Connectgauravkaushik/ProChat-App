import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "messages",
    initialState: {
        messages: null,
    },
    reducers: {
        addMessages: (state, action) => {
         state.messages = action.payload;
        },
        removeMessages : (state , action)=> {
            state.messages = null;
        }
    }
});

export const { addMessages , removeMessages } = messageSlice.actions;
export default messageSlice.reducer;