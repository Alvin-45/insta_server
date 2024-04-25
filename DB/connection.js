const mongoose=require('mongoose')

mongoose.connect(process.env.CONNECTION_STRING).then(
    result=>{
        console.log('Mongodb Atlas connected with Server');
    }
).catch(err=>{
    console.log("Connection Failed!!! Check the connection String");
})