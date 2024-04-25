const users=require('../Model/userModel')
const jwt=require('jsonwebtoken')

exports.register=async(req,res)=>{
    console.log("Inside Register Function");
    const {firstName,email,username,password}=req.body
    console.log(firstName,email,username,password);
    try {
        const existingUser=await users.findOne({username});
        if(existingUser){
            res.status(406).json("User Already exist!!!")
        }else{
            const newUser=new users({
                firstName,
                email,
                username,
                password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        
    } catch (err) {
        res.status(401).json(err)
        
    }
}
exports.login= async (req,res)=>{
    console.log("inside login function");
    const {username,password}=req.body
    console.log(username,password);
    try{
        const existingUser = await users.findOne({username,password})
        if (existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)
            console.log(existingUser);
            res.status(200).json({
                existingUser,
                token
            }) 
        }else{
            res.status(404).json("Incorrect Username/Password")
        }
    }
    catch(err){
        res.status(401).json(err)
     }

}
exports.alluserdetails = async (req, res) => {
    try {
        console.log("Inside Get All Users request function!!!");
        const allUsers = await users.find();
        res.status(200).json(allUsers);
        console.log(allUsers);
    } catch (err) {
        console.error("Error fetching all users:", err);
        res.status(500).json({ error: "Error fetching all users" });
    }
};

exports.searchuser = async (req,res)=>{
    
    const searchKey=req.query.search
    console.log(searchKey);
    const query={
        username:{
            $regex:searchKey,$options:'i'
        }
    }
    try{
        const userResult = await projects.find(query)
        console.log(userResult);
        res.status(200).json(userResult)

    }catch(err){
        res.status(401).json(err)
    }
}

//
exports.getAllUsers = async (req,res)=>{
    
    const searchKey=req.query.search
    // console.log(searchKey);
    const query={
        $or: [
            { username: { $regex: searchKey, $options: 'i' } }, 
            { firstname: { $regex: searchKey, $options: 'i' } } 
        ]
    }
    // console.log(query);
    try{
        const allUsers = await users.find(query)
        res.status(200).json(allUsers)
        console.log(allUsers);
    }catch(err){
        res.status(401).json(err)
        console.log('nope');
    }
}

exports.chatSearch = async (req,res)=>{
    
    const searchKey=req.query.search
    const query={
        $or: [
            { username: { $regex: searchKey, $options: 'i' } }, 
            { firstname: { $regex: searchKey, $options: 'i' } } 
        ]
    }
    // console.log(query);
    try{
        const allUsers = await users.find(query)
        res.status(200).json(allUsers)
        console.log(allUsers);
    }catch(err){
        res.status(401).json(err)
    }
}