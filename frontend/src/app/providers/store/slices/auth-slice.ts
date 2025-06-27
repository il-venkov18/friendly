import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определяем тип TelegramUser
interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date?: number;
  hash?: string;
}

interface AuthState {
  isAuth: boolean;
  userData: TelegramUser | null;
}

const initialState: AuthState = {
  isAuth: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    setUserData: (state, action: PayloadAction<TelegramUser>) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.userData = null;
    },
  },
});

export const { login, logout, setUserData } = authSlice.actions;
export default authSlice.reducer;