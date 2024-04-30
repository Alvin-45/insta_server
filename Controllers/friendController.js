const friends=require('../Model/friendModel')
const users = require('../Model/userModel');

exports.addFriendsAPI = async (req, res) => {
    console.log('Inside Add friend Request');
    console.log(req.body);
    console.log(req.payload.userId);
    
    const userId = req.payload;
    const friendId=req.params.fid;
    let username = null;
  
    try {
      const user = await users.findById(userId);
      if (user) {
        username = user.username;
        const newFriend = new friends({
            userId,
          username,
          friendId
        });
        await newFriend.save();
        res.status(200).json(newFriend);
      } else {
        res.status(404).json({ error: 'User not found(friend api)' });
      }
    } catch (err) {
      res.status(401).json(err);
    }
  };