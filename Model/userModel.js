const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  friends: [
    {
      fid: { type: String },
      fname: { type: String },
      fimg:{ type: String }
    }
  ],
  profileImage:{
    type:String
  }
});

const users = mongoose.model('users', userSchema);

module.exports = users;
