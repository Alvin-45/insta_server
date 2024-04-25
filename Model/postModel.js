const mongoose=require('mongoose')

const postSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    caption:{
        type:String,
    },
    userId:{
        type:String,
        required:true
    }
})

const posts = mongoose.model("posts",postSchema)
module.exports = posts