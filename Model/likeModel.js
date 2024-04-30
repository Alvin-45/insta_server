const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true
  },
  uploader: {
    type: String,
    required: true
  }
});

const like = mongoose.model('like', likeSchema);

module.exports = like;
