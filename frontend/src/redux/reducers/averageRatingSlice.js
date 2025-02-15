import { createSlice } from "@reduxjs/toolkit";

const averageRatingSlice = createSlice({
  name: "averageRating",
  initialState: { value: 0 }, // Default rating value
  reducers: {
    setAverageRating: (state, action) => {
      state.value = action.payload; // Update the average rating
    },
  },
});

export const { setAverageRating } = averageRatingSlice.actions; // Export the action
export default averageRatingSlice.reducer; // Export the reducer
