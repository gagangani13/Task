const mongoose=require('mongoose')
const Schema=mongoose.Schema
const taskSchema=new Schema({
    todo:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    UserId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})
module.exports=mongoose.model('Task',taskSchema)