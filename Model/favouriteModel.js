const mongoose = require('mongoose');

const favSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  poster: {
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
  }
});

const favourite = mongoose.model('favourite', favSchema);

module.exports = favourite;
