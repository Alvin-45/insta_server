const comments = require('../Model/commentModel')
const users = require('../Model/userModel');


exports.addcommentsAPI = async (req, res) => {
    console.log('Inside Add comment Request');
    console.log(req.payload);
    console.log(req.body);
    console.log(req.payload.userId);
    
    const { comment } = req.body;
    const postId = req.params.pid; // Get postId from req.params.pid
    
    const userId = req.payload;
    let username = null;
  
    try {
      const user = await users.findById(userId);
      if (user) {
        username = user.username;
        const newComment = new comments({
          comment,
          userId,
          postId,
          username
        });
        await newComment.save();
        res.status(200).json(newComment);
      } else {
        res.status(404).json({ error: 'User not found(comment api)' });
      }
    } catch (err) {
      res.status(401).json(err);
    }
  };

//   exports.getAllComments = async (req, res) => {
//     console.log('Inside get all Commentsss for a particular post request!!!');
//     const { postId } = req.params; 
//     const userId=req.payload
//     try {
//         const postComments = await comments.find({ postId });
//         res.status(200).json(postComments);
//         console.log(postComments);
//     } catch (err) {
//         res.status(401).json(err);
//     }
// };
exports.getAllComments = async (req, res) => {
  console.log('Inside get all comments for a particular post request!!!');
  const { postId } = req.params; 
  try {
    const postComments = await comments.find({ postId }).exec();      res.status(200).json(postComments);
      console.log(postComments);
  } catch (err) {
      res.status(401).json(err);
  }
};
