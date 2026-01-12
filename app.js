const express = require('express');
const path=require('path');
const app=express();

// middleware to read form data
app.use(express.urlencoded({extended:true}));

app.get('/',(req,resp)=>{
    resp.sendFile(path.join(__dirname,'pages','form.html'));
})

app.post('/login',(req,resp)=>{
    const {email,password}=req.body;
    if(email=='admin@gmail.com' && password=='123'){
        resp.sendFile(path.join(__dirname,'pages','success.html'));
    }else{
        resp.sendFile(path.join(__dirname,'pages','err.html'));
    }

})

app.listen(3200,()=>{
    console.log("Visit http://localhost:3200 ");
})