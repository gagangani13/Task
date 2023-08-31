import {configureStore} from '@reduxjs/toolkit'
import {loginReducer} from './loginSlice'
import { taskReducer } from './taskSlice'
const store= configureStore({
    reducer:{
        loginReducer,taskReducer
    }
})
export default store