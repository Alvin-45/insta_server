const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true
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
  ]
});

const admins = mongoose.model('admin', adminSchema);

module.exports = admins;
