const chats=require('../Model/chatModel')
const jwt = require('jsonwebtoken')
const users = require('../Model/userModel');

exports.addchatsAPI = async (req, res) => {
    console.log('Inside Add chat message Request');
    console.log(req.payload);
    console.log(req.body);
    console.log(req.params.rid);
    
    const { chatmessage } = req.body;
    const receiver = req.params.rid; 
    const sender = req.params.sid;
    
    try {
      
        const newChat = new chats({
            sender,
            receiver,
            chatmessage
        });
        await newChat.save();
        res.status(200).json(newChat);
    } catch (err) {
      res.status(401).json(err);
    }
  };

//   exports.getAllChats = async (req, res) => {
//     console.log('Inside get all chats personal request!!!');
//     const receiver = req.params.receiver;
//     const sender=req.params.sender
//     try {
//       const personalchats = await chats.find({receiver}).exec(); 
           
//       res.status(200).json(personalchats);
//         console.log(personalchats);
//     } catch (err) {
//         res.status(401).json(err);
//     }
//   };
  
exports.getAllChats = async (req, res) => {
    console.log('Inside get all chats personal request!!!');
    const receiver = req.params.receiver;
    const sender = req.params.sender;
    
    try {
        
        const sentChats = await chats.find({ sender, receiver }).exec(); 
        
        const receivedChats = await chats.find({ sender: receiver, receiver: sender }).exec(); 
        const allChats = [...sentChats, ...receivedChats];
        
        res.status(200).json(allChats);
        console.log(allChats);
    } catch (err) {
        res.status(401).json(err);
    }
};
