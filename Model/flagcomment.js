const mongoose = require('mongoose');

const flagcommentSchema = new mongoose.Schema({
  poster: {
    type: String,
    required: true
  },
  reporter: {
    type: String,
    required: true,
  },
  commentId: {
    type: String,
    required: true
  },
  postId:{
    type:String,
    required:true,
    unique:true
  },
  comment:{
    type:String,
    required:true
  }
});

const flagscomments = mongoose.model('flagscomment', flagcommentSchema);

module.exports = flagscomments;
