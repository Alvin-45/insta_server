const users = require('../Model/userModel')
const jwt = require('jsonwebtoken')

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
            await newUser.save()
            res.status(200).json(newUser)
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

    try {
        const user = await users.findById(userId);
        const friend = await users.findOne({ _id: friendId });

        if (!user || !friend) {
            return res.status(404).json({ error: 'User or friend not found' });
        }

        // Check if the friend is already in the user's friends list
        const isFriendAlreadyAdded = user.friends.some(
            (friendItem) => friendItem.fid.toString() === friend._id.toString()
        );

        if (isFriendAlreadyAdded) {
            return res.status(400).json({ error: 'Friend already added' });
        }

        // Add the friend to the user's friends list
        user.friends.push({ fid: friend._id, fname: friend.username });
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
    console.log("Inside luser friend");
    const {userName}=sessionStorage.getItem('existingUser')
    console.log(_id);
    try {
        const currentUser = await users.findOne({ userName });
        console.log(currentUser);
        res.status(200).json(currentUser);
    } catch (err) {
        res.status(401).json(err);
    }
}
exports.editProfile=async(req,res)=>{
    console.log("Inside edit profile");
    const userId=req.payload
    const {firstName,email,username,profileImage} = req.body
    const uploadImage=req.file?req.file.filename:profileImage
    try {
        const updatedProfile=await users.findByIdAndUpdate({_id:userId},{firstName,email,username,profileImage:uploadImage,userId},{new:true})
        await updatedProfile.save()
        res.status(200).json(updatedProfile)
    } catch (err) {
        res.status(401).json(err)
    }
}

