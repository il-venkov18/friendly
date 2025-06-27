import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
  isAuth: boolean;
  userData: TelegramUser | null;
}

const initialState: AuthState = {
  isAuth: false,
  userData: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true
    },

    setUserData(state, action: PayloadAction<TelegramUser>) {
      state.userData = action.payload;
    },

    logout: (state) => {
      state.isAuth = false
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
