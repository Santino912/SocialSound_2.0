import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  destination: {},
  chatId: ''
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
      changeUser: (state, action) => {
        return {
          ...state,
          destination: action.payload.destination,
          chatId: action.payload.chatId
        };
      },
  }
});


export const { changeUser } = chatSlice.actions;

export default chatSlice.reducer;