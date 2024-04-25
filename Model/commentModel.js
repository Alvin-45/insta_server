const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    }
})
const comments=mongoose.model("comments",commentSchema)
module.exports=comments