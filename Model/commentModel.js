const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    }
})
const comments=mongoose.model("comments",commentSchema)
module.exports=comments