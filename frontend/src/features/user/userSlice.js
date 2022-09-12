import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: {
    firstName: '',
    lastName: '',
  },
  score: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name.firstName = action.payload.firstName;
      state.name.lastName = action.payload.lastName;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
  },
});

export const { setName, setScore } = userSlice.actions;

export default userSlice.reducer;
