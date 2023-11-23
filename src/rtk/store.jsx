import { configureStore } from "@reduxjs/toolkit";
import asideSlice from "./slices/aside-slice";
import mealsDataSlice from "./slices/meals-data-slice";
import favoriteListSlice from "./slices/favorite-list-slice";

export const store = configureStore({
  reducer: {
    aside: asideSlice,
    mealsData: mealsDataSlice,
    favoriteList: favoriteListSlice,
  },
});
