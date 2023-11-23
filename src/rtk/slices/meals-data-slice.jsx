import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMeals = createAsyncThunk(
  "mealsDataSlice/fetchMeals",
  async (url) => {
    const res = await fetch(`${url}`);
    const data = await res.json();
    return data;
  },
);

const mealsDataSlice = createSlice({
  initialState: [],
  name: "mealsDataSlice",
  reducers: {
    addNewData: (state, action) => {
      return [...state, ...action.payload];
    },
    fillNewData: (state, action) => {
      return action.payload;
    },
    clear: () => {
      return [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMeals.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default mealsDataSlice.reducer;
export const { addNewData, fillNewData, clear } = mealsDataSlice.actions;
