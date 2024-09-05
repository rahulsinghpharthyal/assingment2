import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../customaxios/axiosPrivate";

export const loginAction = createAsyncThunk(
  "/auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data, status } = await axiosPrivate.post(
        "/api/auth/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if(status === 200){
        alert(data.message)
        console.log('data from backend', data.Data);
          return data.Data;
        }
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
  }
);
