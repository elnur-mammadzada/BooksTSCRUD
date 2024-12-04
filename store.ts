import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./src/features/booksSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./src/features/authSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
