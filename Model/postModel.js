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
    },
    username:{
        type:String,
        required:true
    },
    profileImage:{
        type:String
      },
    likes: [
        {
          lid: { type: String },
          lname: { type: String }
        }
      ],
      fav: [
        {
          fid: { type: String },
          fname: { type: String }
        }
      ]
      
})

const posts = mongoose.model("posts",postSchema)
module.exports = posts