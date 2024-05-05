const admins = require('../Model/adminModel')
const jwt = require('jsonwebtoken')
const posts = require('../Model/postModel');
const users = require('../Model/userModel');
const flags=require('../Model/flagModel')
const admindeleted=require('../Model/admindeletedmodel')
const flagcomment=require('../Model/flagcomment')
const Favouriteup=require('../Model/FavUpdatedModel')

exports.register = async (req, res) => {
    console.log("Inside Register Function");
    const { firstName, email, password } = req.body
    console.log(firstName, email, password);
    try {
        const existingUser = await admins.findOne({ email });
        if (existingUser) {
            res.status(406).json("User Already exist!!!")
        } else {
            const newAdmin = new admins({
                firstName,
                email,
                password
            })
            await newAdmin.save()
            res.status(200).json(newAdmin)
        }

    } catch (err) {
        res.status(401).json(err)

    }
}
exports.login = async (req, res) => {
    console.log("inside login function");
    const { username, password } = req.body
    console.log(username, password);
    try {
        const existingUser = await admins.findOne({ username, password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET)
            console.log(existingUser);
            res.status(200).json({
                existingUser,
                token
            })
        } else {
            res.status(404).json("Incorrect Username/Password")
        }
    }
    catch (err) {
        res.status(401).json(err)
    }

}

exports.getAllflagPosts = async (req,res)=>{
    console.log('Inside get all flag post request!!!');
    const userId = req.payload
    try{
        const flagPosts = await flags.find()
        res.status(200).json(flagPosts)
        // console.log(flagPosts);

    }catch(err){
        res.status(401).json(err)
    }
}

exports.removeflag=async(req,res)=>{
    console.log("Inside Remove flag");
    const {pid}=req.params;
    try {
        const postDetails=await flags.findOneAndDelete({postId:pid})
        res.status(200).json(postDetails)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.deletedposts = async (req, res) => {
    console.log("Inside deleted posts group");
    console.log(req.params); // Assuming all values are in req.params

    const { poster, reporter, postId, postCaption } = req.params;

    try {
        const newDeletedPost = new admindeleted({
            poster:poster,
            reporter:reporter,
            postId:postId,
            postCaption:postCaption
        });

        await newDeletedPost.save();
        res.status(200).json(newDeletedPost);
    } catch (err) {
        res.status(500).json({ error: "Failed to save deleted post ." });
    }
};

exports.removecmtflag=async(req,res)=>{
    console.log("Inside Remove cmt flag");
    const {cid}=req.params;
    try {
        const postDetails=await flagcomment.findOneAndDelete({commentId:cid})
        res.status(200).json(postDetails)
    } catch (err) {
        res.status(401).json(err)
    }
}