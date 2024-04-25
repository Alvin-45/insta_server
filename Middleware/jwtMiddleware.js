const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{

    console.log("Inside JWT Middleware!!!");
    const token = req.headers["authorization"].split(" ")[1]
    if(token){
        // console.log(token);
        try{
            const jwtResponse = jwt.verify(token,process.env.JWT_SECRET)
            console.log(jwtResponse);
            req.payload=jwtResponse.userId
            next()

        }catch(err){
            res.status(401).json("Authorization failed...Please Login!!!")
        }
    }else{
        res.status(406).json("Please Provide Token")
    }

}

module.exports = jwtMiddleware