const express=require('express')
const userController=require("../Controllers/userController")
const router=express.Router()
const postController=require("../Controllers/postController")
const jwtMiddleware=require("../Middleware/jwtMiddleware")
const multerConfig=require('../Middleware/multermiddleware')
const commentControler=require("../Controllers/commentsController")

router.post('/signup',userController.register)

router.post('/login',userController.login)

router.get("/",userController.alluserdetails)

router.get("/usersearch",jwtMiddleware,userController.searchuser)

router.get("/search",jwtMiddleware,userController.getAllUsers)

router.post("/add-post",jwtMiddleware,multerConfig.single('image'),postController.addPost)

router.get("/user-post",jwtMiddleware,postController.getAllPosts)

router.post("/add-comment",jwtMiddleware,commentControler.commentsAPI)

module.exports = router