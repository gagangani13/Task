import { createSlice } from "@reduxjs/toolkit"

const taskSlice = createSlice({
    name:'tasks',
    initialState:{tasks:[],editing:null},
    reducers:{
        loadTask(state,action){
            state.tasks=action.payload
        },
        editTask(state,action){
            state.editing=action.payload
        }
    }
}) 
export default taskSlice
export const taskReducer=taskSlice.reducer
export const taskAction=taskSlice.actions
