const comments = require('../Model/commentModel');
const friends = require('../Model/friendModel');
const posts = require('../Model/postModel');
const users = require('../Model/userModel')
const jwt = require('jsonwebtoken')
const Favouriteup=require('../Model/FavUpdatedModel')
const admins = require('../Model/adminModel')
const flags=require('../Model/flagModel')
const flagscomments = require('../Model/flagcomment');
const chats = require('../Model/chatModel');

// exports.register = async (req, res) => {
//     console.log("Inside Register Function");
//     const { firstName, email, username, password } = req.body
//     console.log(firstName, email, username, password);
//     try {
//         const existingUser = await users.findOne({ username });
//         if (existingUser) {
//             res.status(406).json("User Already exist!!!")
//         } else {
//             const newUser = new users({
//                 firstName,
//                 email,
//                 username,
//                 password
//             })
//             await newUser.save()
//             res.status(200).json(newUser)
//         }

//     } catch (err) {
//         res.status(401).json(err)

//     }
// }

exports.register = async (req, res) => {
    console.log("Inside Register Function");
    const { firstName, email, username, password } = req.body
    console.log(firstName, email, username, password);
    try {
        const existingUser = await users.findOne({ username });
        if (existingUser) {
            res.status(406).json("User Already exist!!!")
        } else {
            const newUser = new users({
                firstName,
                email,
                username,
                password
            })
            await newUser.save();
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
            res.status(200).json({token})
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
        const existingUser = await users.findOne({ username, password })
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
exports.alluserdetails = async (req, res) => {
    try {
        console.log("Inside Get All Users request function!!!");
        const allUsers = await users.find();
        res.status(200).json(allUsers);
        // console.log(allUsers);
    } catch (err) {
        console.error("Error fetching all users:", err);
        res.status(500).json({ error: "Error fetching all users" });
    }
};

exports.searchuser = async (req, res) => {

    const searchKey = req.query.search
    console.log(searchKey);
    const query = {
        username: {
            $regex: searchKey, $options: 'i'
        }
    }
    try {
        const userResult = await projects.find(query)
        // console.log(userResult);
        res.status(200).json(userResult)

    } catch (err) {
        res.status(401).json(err)
    }
}

//
exports.getAllUsers = async (req, res) => {

    const searchKey = req.query.search
    // console.log(searchKey);
    const query = {
        $or: [
            { username: { $regex: searchKey, $options: 'i' } },
            { firstname: { $regex: searchKey, $options: 'i' } }
        ]
    }
    // console.log(query);
    try {
        const allUsers = await users.find(query)
        res.status(200).json(allUsers)
        // console.log(allUsers);
    } catch (err) {
        res.status(401).json(err)
        console.log('nope');
    }
}

exports.adminAllUsers = async (req, res) => {

    try {
        const allUsers = await users.find()
        res.status(200).json(allUsers)
        // console.log(allUsers);
    } catch (err) {
        res.status(401).json(err)
        console.log('nope');
    }
}

exports.chatSearch = async (req, res) => {

    const searchKey = req.query.search
    const query = {
        $or: [
            { username: { $regex: searchKey, $options: 'i' } },
            { firstname: { $regex: searchKey, $options: 'i' } }
        ]
    }
    // console.log(query);
    try {
        const allUsers = await users.find(query)
        res.status(200).json(allUsers)
        // console.log(allUsers);
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.getUsername = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Assuming 'users' is your MongoDB collection
        const user = await users.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ username: user.username }); // Return only the username
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//try
exports.addFriendsAPI = async (req, res) => {
    console.log('Inside Add friend Request');

    const userId = req.payload;
    const friendId = req.params.fid;
    let fimg=null

    try {
        const user = await users.findById(userId);
        
        const friend = await users.findOne({ _id: friendId });

        if (!user || !friend) {
            return res.status(404).json({ error: 'User or friend not found' });
        }

        // Check if the friend is already in the user's friends list
        fimg=friend.profileImage
        const isFriendAlreadyAdded = user.friends.some(
            (friendItem) => friendItem.fid.toString() === friend._id.toString()
        );

        if (isFriendAlreadyAdded) {
            return res.status(400).json({ error: 'Friend already added' });
        }

        // Add the friend to the user's friends list
        user.friends.push({ fid: friend._id, fname: friend.username,fimg:fimg });
        await user.save();

        const updatedUser = await users.findById(userId);
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.isFriendAPI = async (req, res) => {
    console.log('Inside is Friend function!!!');
    const userId = req.payload;
    const friendId = req.params.fid;

    try {
        const user = await users.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isFriend = user.friends.some(friend => friend.fid.toString() === friendId);
        console.log(isFriend);
        res.status(200).json({ isFriend });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.getAllFriends = async (req, res) => {
    console.log("Inside getAllFriends request");
    const userId = req.payload;

    try {
        const user = await users.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const friendsList = user.friends;
        res.status(200).json(friendsList);
        // console.log(friendsList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
        console.log('Error fetching friends!!!');
    }
};
exports.allfrienddetails = async (req, res) => {
    const userId = req.params.uid;
    console.log(userId);

    try {
        console.log("Inside Get All friend Users request function!!!");
        const allUsers = await users.findById(userId);
        res.status(200).json(allUsers);
        // console.log(allUsers);
    } catch (err) {
        console.error("Error fetching friend users:", err);
        res.status(500).json({ error: "Error fetching friend users" });
    }
};



exports.removeFriend = async (req, res) => {
    console.log("Inside Remove friend");
    console.log(req.payload);
    const userId = req.payload;
    const fid = req.params.fid;
    console.log(fid);
    try {
        const updatedUser = await users.findOneAndUpdate(
            { _id: userId },
            { $pull: { friends: { fid: fid } } }, 
            { new: true } // Return the updated document
        );
        console.log(updatedUser);
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(401).json(err);
    }
}

exports.luserdetail = async (req, res) => {
    // console.log("Inside luser friend");
    const userId=req.payload
    // console.log(userId);
    try {
        const currentUser = await users.findOne({_id:userId});
        // console.log(currentUser);
        res.status(200).json(currentUser);
    } catch (err) {
        res.status(401).json(err);
    }
}


// exports.friendcount=async(req,res)=>{
//     console.log('Inside frnt count');
//     const userId=req.payload
//     console.log(userId);
//     let username=null
//     try {
//         const user=await users.findById(userId)
//         username=user.username
        
//         const friendlist=await users.friends.find({fid:userId})
//         console.log(friendlist);
//         res.status(200).json(friendlist)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

exports.friendcount = async (req, res) => {
    // console.log('Inside friend count');
    const userId = req.payload;
    // console.log(userId);
    let username = null;
    try {
        const user = await users.findById(userId);
        username = user.username;

        const friendList = await users.aggregate([
            { $match: { friends: { $elemMatch: { fid: userId, fname: username } } } }
        ]);

        // console.log(friendList);
        res.status(200).json(friendList);
    } catch (err) {
        res.status(500).json(err);
    }
};


exports.editProfile = async (req, res) => {
    console.log('Inside edit Profile');
    const userId = req.payload;
    console.log(req.body);
    const { firstName, email, username, password, friends } = req.body;

    try {
        
        // Update posts where userId matches
        const updatedPosts = await posts.updateMany(
            { userId: userId },
            { $set: { username: username } }
        );
        console.log("post sec completed");
//fav fav owner
        const updatedFavposts = await Favouriteup.updateMany(
            { userId: userId },
            { $set: { username: username } }
        );
        console.log("fav sec completed");

//fav post owner
        const updatedFavposters = await Favouriteup.updateMany(
            { posterId: userId },
            { $set: { poster: username } }
        );
        console.log("fav2 sec completed");

        const updatedComments = await comments.updateMany(
            { userId: userId },
            { $set: { username: username } }
        );
        console.log("comm sec completed");

        const updatedFriends = await users.updateMany(
            { 'friends.fid': userId },
            { $set: { 'friends.$.fname': username } }
        );
        console.log("frnd sec completed");

        const updatedflag = await flags.updateMany(
            { posterId: userId },
            { $set: { poster: username } }
        );
        const updatedflag2 = await flags.updateMany(
            { reporterId: userId },
            { $set: { reporter: username } }
        );

        // Update user model
        const updatedProfile = await users.findByIdAndUpdate(
            { _id: userId },
            { firstName, email, username, password, friends },
            { new: true }
        );

        console.log('Inside success');
        res.status(200).json(updatedProfile);
    } catch (err) {
        console.log('Failed');
        res.status(401).json(err);
    }
};



exports.updateprofilepic=async (req,res)=>{ 
    console.log('inside prof-pic update fn');
    console.log(req.payload);
    const userId=req.payload
    const profileImage=req.file.filename
    console.log(profileImage);
    try {
        const user=await users.findById(userId)
        console.log(user);
        console.log("final step");
        const result=await users.findByIdAndUpdate({_id:userId},
            {
                $set:{
                    profileImage:profileImage
                }
            }
        )
        await result.save();
        console.log(result);
        res.status(200).json(result)
    } catch (err) {
        console.log("failure");
        res.status(500).json(err)
        
    }

}

exports.searchfriendcount = async (req, res) => {
    console.log('Inside friend count for search');
    console.log(req.params);
    const userId = req.params.uid;
    let username = null;
    try {
        console.log('inside try');
        const user = await users.findById(userId);
        console.log(user);
        username = user.username;
        console.log(username);
        const friendList = await users.aggregate([
            { $match: { friends: { $elemMatch: { fid: userId, fname: username } } } }
        ]);

        console.log(friendList);
        res.status(200).json(friendList);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteUser=async (req,res)=>{
    console.log('Inside dlt user fn');
    console.log(req.body)
    const {userId}=req.body
    let username=null
    try {
        const user=await users.findById(userId)
        username=user.username
        console.log(username);
        const result6=await chats.updateMany({ receiver: username }, { $set: { receiver: 'Sanapgram User' } }) 
        const result7=await chats.updateMany({ sender: username }, { $set: { sender: 'Sanapgram User' } })
        console.log('result6 success');
        const updatedUser = await users.findOneAndUpdate(
            { 'friends.fid': userId },
            { $pull: { friends: { fid: userId } } }, 
            { new: true } // Return the updated document
        );
        const updatedownfrndUser = await users.findOneAndUpdate(
            { _id: userId },
            { $set: { friends: [] } }, 
            { new: true } // Return the updated document
        );
        console.log('update user success');

        const result4=await Favouriteup.deleteMany({userId:userId})
        console.log('result4 success');

        const updatfavpost=await Favouriteup.deleteMany({posterId:userId})

        const updatedpostfavUser = await posts.findOneAndUpdate(
            { 'fav.fid': userId },
            { $pull: { fav: { fid: userId } } }, 
            { new: true } // Return the updated document
        );
        console.log('updatefav success');
        const updatedlike = await posts.updateMany(
            { 'likes.lid': userId },
            { $pull: { likes: { lid: userId } } }, 
            { new: true } // Return the updated document
        );//success
        console.log(updatedlike);

        const result5=await flags.deleteMany({posterId:userId})
        console.log('result5 success');

        const result3=await comments.deleteMany({userId:userId})
        console.log('result3 success');

        const result2=await posts.deleteMany({userId:userId})
        console.log('result2 success');

        const result=await users.findByIdAndDelete(userId)
        res.status(200).json(result)
    } catch (err) {
        res.status(401).json(err)
    }
}

// exports.deleteUser=async (req,res)=>{
//     console.log('Inside dlt user fn');
//     console.log(req.body)
//     const {userId}=req.body
//     let username=null
//     try {
        
//         const updatedlike = await posts.updateMany(
//             { 'likes.lid': userId },
//             { $pull: { likes: { lid: userId } } }, 
//             { new: true } // Return the updated document
//         );//success
//         console.log(updatedlike);
//         res.status(200).json(updatedlike)
//     } catch (err) {
//         res.status(401).json(err)
//     }
// }