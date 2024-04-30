const mongoose = require('mongoose');

const admindeletedSchema = new mongoose.Schema({
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
  }
});

const admindeleted = mongoose.model('admindeleted', admindeletedSchema);

module.exports = admindeleted;
