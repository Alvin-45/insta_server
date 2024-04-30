const mongoose=require('mongoose')

const friendSchema=mongoose.Schema({
    userId:{
        type:String,
        required:true
    },username:{
        type:String,
        required:true
    },
    friendId:[String]

})

const friends=mongoose.model("friends",friendSchema)
module.exports=friends