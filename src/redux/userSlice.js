import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],  // Array to store registered users
  currentUser: null,  // Logged-in user
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      // Add the new user to the users array
      const newUser = action.payload;
      state.users.push(newUser);
    },
    loginUser: (state, action) => {
      // Find the user by username or mobile and validate the password
      const { usernameOrMobile, password } = action.payload;
      const foundUser = state.users.find(
        user =>
          (user.username === usernameOrMobile || user.mobile === usernameOrMobile) &&
          user.password === password
      );

      if (foundUser) {
        state.currentUser = foundUser;
      } else {
        state.currentUser = null;
      }
    },
    logoutUser: (state) => {
      state.currentUser = null; // Clear the current user on logout
    },
  },
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
