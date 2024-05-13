const express=require('express')
const userController=require("../Controllers/userController")
const router=express.Router()
const postController=require("../Controllers/postController")
const jwtMiddleware=require("../Middleware/jwtMiddleware")
const multerConfig=require('../Middleware/multermiddleware')
const commentControler=require("../Controllers/commentsController")
const friendControler=require("../Controllers/friendController")
const chatController=require("../Controllers/chatController")
const adminController=require('../Controllers/adminController')

router.post('/signup',userController.register)

router.post('/login',userController.login)

router.post('/adminsignup',adminController.register)

router.post('/adminlogin',adminController.login)

router.get("/",userController.alluserdetails)

router.get("/usersearch",jwtMiddleware,userController.searchuser)

router.get("/search",jwtMiddleware,userController.getAllUsers)

router.post("/add-post",jwtMiddleware,multerConfig.single('image'),postController.addPost)

router.post("/admin-post",jwtMiddleware,multerConfig.single('image'),postController.addadminPost)

router.post("/flag-post/:pid/:pc",jwtMiddleware,postController.addflagPost)

router.post("/fav-post",jwtMiddleware,postController.addfavPost)

router.post('/add-comment/:pid',jwtMiddleware,commentControler.addcommentsAPI)

router.post('/add-admindeleted/:poster/:postId/:postCaption/:reporter',jwtMiddleware,commentControler.addcommentsAPI)

router.post('/add-friend/:fid',jwtMiddleware,userController.addFriendsAPI)

router.get('/adminallusers', userController.adminAllUsers);

router.get("/reported-pic/:pid",jwtMiddleware,multerConfig.single('image'),postController.reportedPic)

router.get("/user-post",jwtMiddleware,postController.getAllPosts)

router.get("/flag-post",jwtMiddleware,adminController.getAllflagPosts)

router.get("/search-post/:uid",jwtMiddleware,postController.searchUserPosts)

router.get('/post-comments/:postId', jwtMiddleware, commentControler.getAllComments);

router.get('/getAllPosts', postController.getHomePosts);
router.get('/getAllUsers', userController.getUsername);

router.get('/luser', jwtMiddleware, userController.luserdetail);

router.get('/isfriend/:fid',jwtMiddleware,userController.isFriendAPI)

router.get("/friendspage",jwtMiddleware,userController.getAllFriends)

router.get("/frienddetails/:uid",userController.allfrienddetails)

router.delete("/remove-post/:pid",jwtMiddleware,postController.removePost)

router.delete("/remove-fav/:pid",jwtMiddleware,postController.removefav)

router.delete("/remove-flag/:pid",jwtMiddleware,adminController.removeflag)

router.delete("/remove-cmtflag/:cid",jwtMiddleware,adminController.removecmtflag)

router.delete("/remove-friend/:fid",jwtMiddleware,userController.removeFriend)

router.delete("/remove-comment/:cid",jwtMiddleware,commentControler.dltcomment)

//chat part
router.post('/add-chat/:rid/:sid',jwtMiddleware,chatController.addchatsAPI)

router.get('/get-chats/:receiver/:sender', jwtMiddleware, chatController.getAllChats);

router.put("/edit-profile",jwtMiddleware,userController.editProfile);

router.get("/adminsearch-post/:pid",jwtMiddleware,postController.adminUserPosts)

router.post('/manage-likes',jwtMiddleware,postController.managelikes)

router.post('/dlt-likes',jwtMiddleware,postController.dltlikes)

router.post('/dlt-fav',jwtMiddleware,postController.dltfav)


router.get('/doespostexist/:pid', jwtMiddleware, postController.doespostexist);

router.post('/flag-comment/:pid/:cid',jwtMiddleware,commentControler.addflagComment)

router.put("/edit-comment/:cid",jwtMiddleware,commentControler.editComment)

router.get('/isfav/:pid',jwtMiddleware,postController.isfav)

router.get('/frndcount',jwtMiddleware,userController.friendcount)

router.get('/searchfrndcount/:uid',jwtMiddleware,userController.searchfriendcount)


router.get('/getallfav',jwtMiddleware,multerConfig.single('profileimage'),postController.getAllfav)

router.get('/getflagcmt',jwtMiddleware,commentControler.getflagComment)

router.put("/profile-pic",jwtMiddleware,multerConfig.single('profileImage'),userController.updateprofilepic)

router.delete("/dlt-user",jwtMiddleware,userController.deleteUser)

module.exports = router