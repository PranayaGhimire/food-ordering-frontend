import { IRegisterForm } from '@/utils/interfaces/RegisterForm'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export interface AuthState {
  token: string | undefined,
  user:IRegisterForm | null
}

const getUser = () => {
  if (typeof window === 'undefined')
      return null;
  const user = Cookies.get("user")
  if(user)
    return JSON.parse(user);
}
const initialState: AuthState = {
  token: Cookies.get("token"),
  user: getUser()
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state,action:PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token =action.payload;
      Cookies.set("token",action.payload);
    },
    setUser: (state,action:PayloadAction<IRegisterForm>) => {
        state.user = state.user;
        Cookies.set("user",JSON.stringify(action.payload));
    },
    logout:(state) => {
        state.token = undefined;
        state.user = null;
        Cookies.remove("token");
        Cookies.remove("user");
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToken, setUser, logout } = authSlice.actions

export default authSlice.reducer