import { createSlice } from "@reduxjs/toolkit";

const localData = JSON.parse(localStorage.getItem("user"))
console.log("inside the slice:",localData);

const taskData = JSON.parse(localStorage.getItem("task"))
console.log("inside thetask:",taskData);
const userSlice = createSlice({
  name: "user",
  initialState: {
    username: localData ? localData.username:null,
    task: taskData ?  taskData: null
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
    },
    setTask: (state, action) => {
      state.task = action.payload;
    }
  }
});

export const { setUser, setTask } = userSlice.actions;
export default userSlice.reducer;
