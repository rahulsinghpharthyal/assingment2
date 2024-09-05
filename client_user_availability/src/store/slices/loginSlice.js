import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "../actions/loginActions";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoading: false,
    error: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logoutSuccess: (state) => {
          state.user = null;
          localStorage.removeItem("user");
        },
        updateUser: (state, action) => {
            console.log('action from update user', action);
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload)); 
        }
      },
      
    extraReducers: (builder) => {
        builder
        .addCase(loginAction.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(loginAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action?.payload;
            console.log('stae user', action);
             localStorage.setItem("user", JSON.stringify(action.payload));
        })
        .addCase(loginAction.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action?.payload;
        });
    }
});

export const { logoutSuccess, updateUser } = loginSlice.actions;

export default loginSlice.reducer;