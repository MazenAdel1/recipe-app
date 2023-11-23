import { createSlice } from "@reduxjs/toolkit";

const asideSlice = createSlice({
  initialState: false,
  name: "asideSlice",
  reducers: {
    toggleAsideStatus: (state) => {
      return !state;
    },
  },
});

export const { toggleAsideStatus } = asideSlice.actions;
export default asideSlice.reducer;
