import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./features/exampleSlice.js";

export const store = configureStore({
  reducer: {
    example: exampleReducer,
  },
});
