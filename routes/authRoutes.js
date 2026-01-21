const express = require('express');
const path = require('path');
const router = express.Router();

const { getUsers, saveUsers} = require('../utils/filehandler');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../pages/login.html'));
});

router.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'../pages/signUp.html'));
})