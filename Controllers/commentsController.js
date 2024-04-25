const comments=require('../Model/commentModel')

exports.commentsAPI=async(req,res)=>{
    const {_id}=sessionStorage.getItem("token")
    const logedinuser=_id
    sessionStorage.setItem("loggedUser",logedinuser)
    const {comment}=req.body
    const userId = req.payload
    try{
        
        const newcomment = new comments({
            comment
        })
        await newcomment.save()
        res.status(200).json(newcomment)
    

}catch(err){
    res.status(401).json(err)
}
}