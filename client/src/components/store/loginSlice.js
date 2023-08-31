import { createSlice } from "@reduxjs/toolkit";

const loginSlice=createSlice({
    name:'user-login',
    initialState:{login:false},
    reducers:{
        setLogin(state,action){
            state.login=action.payload
        }
    }
})
export default loginSlice
export const loginReducer=loginSlice.reducer
export const loginAction=loginSlice.actions