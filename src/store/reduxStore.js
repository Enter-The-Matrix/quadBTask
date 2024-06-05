import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";

export const reduxStore = configureStore({
    reducer:{
       user:userSlice
    }
})