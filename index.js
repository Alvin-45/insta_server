require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routers/router')
require('./DB/connection')




const app = express()
app.use(cors())
app.use(express.json())
app.use(router)
app.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

app.listen(PORT,()=>{
    console.log(`App Started at PORT : ${PORT}`);
})

app.get("/",(req,res)=>{
    res.status(200).send(`<h1 style="color:red">app Started and waiting for client request</h1>`)
})