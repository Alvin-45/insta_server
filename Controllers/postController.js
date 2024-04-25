const posts=require('../Model/postModel')

exports.addPost = async (req,res)=>{
    console.log("Inside Add Post Request");
    console.log(req.payload);
    console.log(req.body);
    console.log(req.file);
    const {caption} = req.body
    const userId = req.payload
    const image = req.file.filename
    try{
        
            const newpost = new posts({
                image,caption,userId
            })
            await newpost.save()
            res.status(200).json(newpost)
        

    }catch(err){
        res.status(401).json(err)
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