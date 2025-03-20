import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updated: "No", // Default value
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    setUpdated: (state, action) => {
      state.updated = action.payload; // ✅ Allows setting "updated" from anywhere
    },
  },
});

export const { setUpdated } = updateSlice.actions; // Export action

export default updateSlice.reducer; // Export reducer
