const mongoose = require('mongoose');

const flagSchema = new mongoose.Schema({
  poster: {
    type: String,
    required: true
  },
  reporter: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true
  },
  postCaption:{
    type:String,
    required:true
  },
  posterId: {
    type: String,
    required: true
  },
  reporterId: {
    type: String,
    required: true,
  }
});

const flags = mongoose.model('flags', flagSchema);

module.exports = flags;
