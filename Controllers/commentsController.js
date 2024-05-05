const comments = require('../Model/commentModel')
const users = require('../Model/userModel');
const posts = require('../Model/postModel');
const admins = require('../Model/adminModel')
const flags = require('../Model/flagModel')
const like = require('../Model/likeModel')
const flagscomments = require('../Model/flagcomment')

//success
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

//success
exports.getAllComments = async (req, res) => {
  console.log('Inside get all comments for a particular post request!!!');
  const { postId } = req.params;
  try {
    const postComments = await comments.find({ postId }).exec(); res.status(200).json(postComments);
    console.log(postComments);
  } catch (err) {
    res.status(401).json(err);
  }
};


//success
exports.addflagComment = async (req, res) => {
  console.log("Inside Add Comment flag Request");
  console.log(req.payload);
  console.log(req.body);
  console.log(req.params);
  const posterid = req.body.posterId;
  const postId = req.params.pid;
  const commentId = req.params.cid;
  const reporterid = req.payload;
  let poster = null;
  let reporter = null;
  let comment = null

  try {
    console.log('Inside try block');
    const user = await users.findById(posterid);
    const user2 = await users.findById(reporterid);
    const cmt1 = await comments.findById(commentId)
    console.log(cmt1);

    if (user && user2) {
      console.log('User exist');

      poster = user.username;
      reporter = user2.username
      console.log(poster);
      comment = cmt1.comment

      const newcommentflag = new flagscomments({
        poster, reporter, commentId, postId, comment
      });
      console.log(newcommentflag);
      await newcommentflag.save();
      console.log("comment flag saved successfully");
      res.status(200).json(newcommentflag);
    } else {

      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error(flag)' });
  }
}

exports.getflagComment = async (req, res) => {
  try {
    const allflagcomments = await flagscomments.find()
    console.log(allflagcomments);
    res.status(200).json(allflagcomments)

  } catch (err) {
    res.status(500).json(err)
  }


}

//success
exports.dltcomment = async (req, res) => {
  console.log("Inside Remove Comment");
  const { cid } = req.params;
  try {
    const commentDetails = await comments.findByIdAndDelete({ _id: cid })
    res.status(200).json(commentDetails)
  } catch (err) {
    res.status(401).json(err)
  }
}

//edit-comment working on (does chat exist update concept)
exports.editComment = async (req, res) => {
  console.log("Inside edit Comment");
  const cid = req.params.cid
  const { comment } = req.body
  try {
    const updatedComment = await comments.findByIdAndUpdate({ _id: cid }, { comment }, { new: true })
    await updatedComment.save()
    res.status(200).json(updatedComment)
  } catch (err) {
    res.status(401).json(err)
  }
}

