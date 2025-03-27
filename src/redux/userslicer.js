import { createSlice } from "@reduxjs/toolkit"
const initialState = [];

const userslicer=createSlice({
    name:"user",
    initialState,
    reducers:{
        AddUser:(state,action)=>{
            state.push(action.payload)

        },
        RemoveUser:(state)=>{
            state.pop(0);
        },
        
    }
})
export const {AddUser,RemoveUser}=userslicer.actions;
export default userslicer.reducer;