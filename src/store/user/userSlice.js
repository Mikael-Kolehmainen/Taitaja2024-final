import { createSlice } from "@reduxjs/toolkit";

/*
  This is userSlice.js. This is a slice, where we can define different functions
  for the state, for example for storing a value to the state or clearing that
  specific value. We then export these functions so that they can be passed to
  the rootReducer.
*/

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    role: null,
    session: null,
  },
  reducers: {
    saveSession: (state, action) => {
      state.session = action.payload.session;
      state.role = action.payload.role;
      state.username = action.payload.username;
    },
    clearSession: (state) => {
      state.username = null;
      state.role = null;
      state.session = null;
    },
  },
});

export const { saveSession, clearSession } = userSlice.actions;

export default userSlice.reducer;
