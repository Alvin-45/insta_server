const posts = require('../Model/postModel');
const users = require('../Model/userModel');
const admins = require('../Model/adminModel')
const flags=require('../Model/flagModel')
const like=require('../Model/likeModel')

exports.addPost = async (req, res) => {
    console.log("Inside Add Post Request");
    console.log(req.payload);
    console.log(req.body);
    console.log(req.file);
    const { caption } = req.body;
    const userId = req.payload;
    const image = req.file.filename;
    let username = null;
    try {
        const user = await users.findById(userId);
        if (user) {
            username = user.username;
            const newPost = new posts({
                image, caption, userId, username
            });
            await newPost.save(); 
            res.status(200).json(newPost); 
        } else {
            
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error(addPost)' });
    }
}

exports.addadminPost = async (req, res) => {
    console.log("Inside Add Post Request");
    console.log(req.payload);
    console.log(req.body);
    console.log(req.file);
    const { caption } = req.body;
    const userId = req.payload;
    const image = req.file.filename;
    let username = null;
    try {
        const user = await admins.findById(userId);
        if (user) {
            username = user.firstName;
            const newPost = new posts({
                image, caption, userId, username
            });
            await newPost.save(); 
            res.status(200).json(newPost); 
        } else {
            
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error(addPost)' });
    }
}

exports.addflagPost = async (req, res) => {
    console.log("Inside Add flag Request");
    console.log(req.payload);
    console.log(req.body);
    console.log(req.params);
    const posterid  = req.body.userId;
    const postId=req.params.pid;
    const postCaption=req.params.pc;
    const reporterid = req.payload;
    let poster = null;
    let reporter = null;

    try {
        const user = await users.findById(posterid);
        const user2 = await users.findById(reporterid);
        if (user && user2) {
            poster = user.username;
            
            reporter=user2.username
            const newflag = new flags({
                poster, reporter, postId, postCaption
            });
            console.log(newflag);
            await newflag.save(); 
            console.log("flag saved successfully");
            res.status(200).json(newflag); 
        } else {
            
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error(flag)' });
    }
}


exports.getAllPosts = async (req,res)=>{
    console.log('Inside get all post request!!!');
    const userId = req.payload
    try{
        const userPosts = await posts.find({userId})
        res.status(200).json(userPosts)
        console.log(userPosts);

    }catch(err){
        res.status(401).json(err)
    }
}



// exports.getHomePosts = async (req, res) => {
//     console.log('Inside get all post request!!!');
//     try {
//         const allPosts = await posts.find(); // Find all posts without filtering by userId
//         res.status(200).json(allPosts);
//         console.log(allPosts);
//     } catch (err) {
//         res.status(401).json(err);
//     }
// }

exports.getHomePosts = async (req, res) => {
    console.log('Inside get all post request!!!');
    try {
      const allPosts = await posts.find().populate('userId', 'username'); 
      res.status(200).json(allPosts);
    //   console.log(allPosts);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  

exports.searchUserPosts = async (req,res)=>{
    console.log('Inside get search post request!!!');
    const userId = req.params.uid
    console.log(req.params.uid);
    try{
        const userPosts = await posts.find({userId})
        res.status(200).json(userPosts)
        console.log(userPosts);

    }catch(err){
        res.status(401).json(err)
    }
}

exports.removePost=async(req,res)=>{
    console.log("Inside Remove Project");
    const {pid}=req.params;
    try {
        const postDetails=await posts.findByIdAndDelete({_id:pid})
        res.status(200).json(postDetails)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.reportPost=async(req,res)=>{
    console.log("Inside Report Project");
    const {pid}=req.params;
    try {
        const postDetails=await posts.findByIdAndUpdate({_id:pid})
        
        res.status(200).json(postDetails)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.reportedPic = async (req,res)=>{
    console.log('Inside get reported post request!!!');
    const pid = req.params.pid
    console.log(req.params.pid);
    try{
        const reportedPost = await posts.find({_id:pid})
        res.status(200).json(reportedPost)
        console.log(reportedPost);

    }catch(err){
        res.status(401).json(err)
    }
}

exports.adminUserPosts = async (req,res)=>{
    console.log('Inside get search post request for admin!!!');
    const pid = req.params.pid
    console.log(req.params.pid);
    try{
        const userPosts = await posts.find({_id:pid})
        res.status(200).json(userPosts)
        console.log(userPosts);

    }catch(err){
        res.status(401).json(err)
    }
}


exports.managelikes=async(req,res)=>{
    console.log('Inside manage likes Request');

    const userId = req.payload;
    const postId = req.params.pid;
    const username=null;

    try {
        const user = await users.findById(userId);
        if (user) {
            username=user.username
            const updatedlike=await users.findByIdAndUpdate({_id:postId},
            {
                $push:{
                    likes:{lid:''}
                }
            })

        }
        
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

exports.doespostexist=async (req,res)=>{
    console.log('Inside does post exist request!!!');
    const pid=req.params.pid
    try {
      const allPosts = await posts.find({_id:pid}); 
      if(allPosts[0]){

      }else{
        console.log('Empty array');
      }
      res.status(200).json(allPosts);
      console.log(allPosts);
    } catch (err) {
      res.status(401).json({error:"Post doesn't exist"});
    }
}