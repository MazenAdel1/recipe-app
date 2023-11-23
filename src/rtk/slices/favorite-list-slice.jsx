import { createSlice } from "@reduxjs/toolkit";

const favoriteListSlice = createSlice({
  initialState: [],
  name: "favoriteListSlice",
  reducers: {
    addItem: (state, action) => {
      state = [...state, action.payload];
      return state;
    },
    deleteItem: (state, action) => {
      state = state.filter((el) => el.idMeal != action.payload.idMeal);
      return state;
    },
    saveToLocalStorage: (state) => {
      return localStorage.setItem(`favoriteList`, JSON.stringify(state));
    },
    getFromLocalStorage: (state) => {
      if (localStorage.getItem(`favoriteList`)) {
        state = JSON.parse(localStorage.getItem(`favoriteList`));
        return state;
      }
    },
    clearList: () => {
      return [];
    },
  },
});

export default favoriteListSlice.reducer;
export const {
  addItem,
  deleteItem,
  saveToLocalStorage,
  getFromLocalStorage,
  clearList,
} = favoriteListSlice.actions;
