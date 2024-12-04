import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserState } from "../types/types";
import axios from "axios";

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  isAuth: false,
};

export const fetchUsersByUsername = createAsyncThunk(
  "fetchUsersByUserName",
  async (data: { username: string; password: string }, thunkApi) => {
    try {
      const response = await axios.get<User[]>(
        `http://localhost:3004/users?username=${data.username}&&password=${data.password}`
      );
      if (response.data.length > 0) {
        return response.data;
      } else {
        return thunkApi.rejectWithValue("İstifadəçi adı və ya şifrə səhvdir");
      }
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.users = [];
      localStorage.removeItem("isAuth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersByUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersByUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.users = action.payload;
        localStorage.setItem("isAuth", "true");
      })
      .addCase(fetchUsersByUsername.rejected, (state) => {
        state.loading = false;
        state.isAuth = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
