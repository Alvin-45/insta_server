const mongoose=require('mongoose')

const chatSchema=mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    chatmessage:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
})

const chats=mongoose.model("chats",chatSchema)
module.exports=chats