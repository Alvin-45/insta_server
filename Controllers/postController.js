const posts = require('../Model/postModel');
const users = require('../Model/userModel');
const admins = require('../Model/adminModel')
const flags=require('../Model/flagModel')
const like=require('../Model/likeModel')
const favourite=require('../Model/favouriteModel')
const Favouriteup=require('../Model/FavUpdatedModel')

exports.addPost = async (req, res) => {
    console.log("Inside Add Post Request");
    console.log(req.payload);
    console.log(req.body);
    console.log(req.file);
    const { caption } = req.body;
    const userId = req.payload;
    const image = req.file.filename;
    let profileImage=null
    let username = null;
    try {
        const user = await users.findById(userId);
        if (user) {
            username = user.username;
            profileImage=user.profileImage
            const newPost = new posts({
                image, caption, userId, username,profileImage
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
    const posterId  = req.body.userId;
    const postId=req.params.pid;
    const postCaption=req.params.pc;
    const reporterId = req.payload;
    let poster = null;
    let reporter = null;

    try {
        const user = await users.findById(posterId);
        const user2 = await users.findById(reporterId);
        if (user && user2) {
            console.log('exist');
            poster = user.username;
            console.log(poster);
            reporter=user2.username
            console.log(reporter);
            const newflag = new flags({
                poster,
                reporter,
                postId, postCaption,
                posterId,
                reporterId,
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
    // console.log('Inside get all post request!!!');
    const userId = req.payload
    try{
        const userPosts = await posts.find({userId})
        res.status(200).json(userPosts)
        // console.log(userPosts);

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
    // console.log('Inside get all post request!!!');
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
    console.log("Inside Remove Post");
    const {pid}=req.params;
    try {
        const postDetails=await posts.findByIdAndDelete({_id:pid})
        console.log(postDetails);
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


// exports.managelikes=async(req,res)=>{
//     console.log('Inside manage likes Request');
//     console.log(req.payload);
//     console.log(req.body);
//     const userId = req.payload;
//     const {postId} = req.body;
//     let username=null;
//     console.log(postId);
//     try {
//         const user = await users.findById(userId);
//         if (user) {
//             console.log('inside iif');
//             username=user.username

//             console.log(username);
//             const updatedlike=await posts.findByIdAndUpdate({_id:postId},
//             {
//                 $addToSet:{
//                     likes:{lid:userId,
//                         lname:username
//                     }
//                 }
//             },{new:true}
//         )
//         res.status(200).json(updatedlike)
//         }
        
//     } catch (err) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }

// }

exports.managelikes = async (req, res) => {
    console.log('Inside manage likes Request');
    console.log(req.payload);
    console.log(req.body);
    const userId = req.payload;
    const { postId } = req.body;
    let username = null;
    console.log(postId);
    try {
        const user = await users.findById(userId);
        if (user) {
            console.log('inside if');
            username = user.username;

            console.log(username);
            const post = await posts.findById(postId);
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            const existingLike = post.likes.find(like => like.lid.toString() === userId.toString());
            if (existingLike) {
                return res.status(400).json({ error: 'You have already liked this post' });
            }

            const updatedLike = await posts.findByIdAndUpdate(
                { _id: postId },
                {
                    $addToSet: {
                        likes: {
                            lid: userId,
                            lname: username
                        }
                    }
                },
                { new: true }
            );
            res.status(200).json(updatedLike);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.dltlikes = async (req, res) => {
    console.log('Inside dlt likes Request');
    console.log(req.payload);
    console.log(req.body);
    const userId = req.payload;
    const { postId } = req.body;
    console.log(postId);
    try {
        const existingPost = await posts.findById(postId);
        const { likes } = existingPost;
        const likeIndex = likes.findIndex(like => like.lid ===userId);
        if (likeIndex !== -1) {
            existingPost.likes.splice(likeIndex, 1);
            const updatedPost = await existingPost.save();
            res.status(200).json({ message: 'Like removed successfully', updatedPost });
        } else {
            res.status(404).json({ error: 'Like not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// exports.managelikes = async (req, res) => {
//     console.log('Inside manage likes Request');

//     const userId = req.payload;
//     const { postId } = req.body;

//     try {
//         const user = await users.findById(userId);
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         const existingPost = await posts.findById(postId);
//         if (!existingPost) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         const { likes } = existingPost;
//         const likeIndex = likes.findIndex(like => like.lid === userId);
//         if (likeIndex !== -1) {
//             // User's like already exists, remove it
//             existingPost.likes.splice(likeIndex, 1);
//         } else {
//             // User's like doesn't exist, add it
//             existingPost.likes.push({ lid: userId, lname: user.username });
//         }

//         const updatedPost = await existingPost.save();
//         res.status(200).json({ message: 'Like managed successfully', updatedPost });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

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

//success
exports.addfavPost = async (req, res) => {
    console.log("Inside Add favourite Request");
    console.log(req.body);
    const {poster,postId,postCaption,postImage}  = req.body;
    console.log(poster);
    console.log(postId);
    console.log(postCaption);
    console.log(postImage);

    const userId = req.payload;
    let username = null;
    let posterId=null
    try {
        console.log('Indide try looooop');
        const user = await users.findById(userId);
        const post=await posts.findById(postId)
            username=user.username 
            console.log(username);
            posterId=post.userId
            const newFavourite = new Favouriteup({
                userId,username,posterId, poster, postId, postCaption,postImage
            });
            console.log(newFavourite);
            await newFavourite.save();  
            console.log("Favourite saved successfully");
            res.status(200).json(newFavourite); 
        
    } catch (err) {
        console.log('errroooorrrr');
        res.status(500).json({ error: 'Internal Server Error(flag)' });
    }
}

// exports.getallfav=async(req,res)=>{
//     try {
//         const allFav=await favourite.find()
//         console.log(allFav);
//         res.status(200).json(allFav)
//     } catch (err) {
//         res.status(404).json(err)
//     }
// }
exports.isfav=async(req,res)=>{
    const postid=req.params.pid
    const userId=req.payload
    let username=null
    try {
        const user=await users.findOne(userId)
        username=user.username
        const allFav=await Favouriteup.find({username:username})
        console.log(allFav);
        res.status(200).json(allFav)
    } catch (err) {
        res.status(404).json(err)
    }
}

exports.getAllfav = async (req,res)=>{
    console.log('Inside get all fav request!!!');
    const userId = req.payload
    let username=null
    try{
        const user=await users.findOne({_id:userId})
        username=user.username
        const userPosts = await Favouriteup.find({username:username})
        res.status(200).json(userPosts)
        // console.log(userPosts);

    }catch(err){
        res.status(401).json(err)
    }
}

//working on
exports.removefav=async(req,res)=>{
    console.log("Inside Remove fav");
    console.log(req.params);
    const {pid}=req.params;
    try {
        console.log('Inside try');
        const postDetails=await Favouriteup.findOneAndDelete({postId:pid})
        res.status(200).json(postDetails)
        console.log("success");
    } catch (err) {
        res.status(401).json(err)
    }
}
