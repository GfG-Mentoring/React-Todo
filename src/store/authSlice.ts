import { createSlice } from '@reduxjs/toolkit';

export const loadUserData = () => {
  try {
    const data: any = localStorage.getItem('auth');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return {
      email: '',
      fullName: '',
      userId: '',
      accessToken: null,
      isLoggedIn: false,
    };
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadUserData(),
  reducers: {
    setAuth: (state, action) => {
      // payload {
      // email: "",
      // fullName:"",
      // id: "",
      // accessToken: null,
      // }
      console.log(state, action);
      state = {
        ...action.payload,
        userId: action.payload.id,
        isLoggedIn: true,
      };
      localStorage.setItem('auth', JSON.stringify(state));
      return state;
    },
    removeAuth: (state) => {
      state = {
        email: '',
        fullName: '',
        userId: '',
        accessToken: null,
        isLoggedIn: false,
      };
      localStorage.removeItem('auth');
      return state;
    },
  },
});
export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;

export { authSlice };
