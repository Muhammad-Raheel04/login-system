require('dotenv').config();

const express = require('express');
const path = require('path');
const session =require('express-session');

const authRoutes =require('./routes/authRoutes');

const app =express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret:String(process.env.SESSION_SECRET) || 'keyboard_cat',
        resave:false,
        saveUninitialized:false
    })
)

app.use('/',authRoutes);

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
    console.log("Visit http://localhost:3200 ");
})