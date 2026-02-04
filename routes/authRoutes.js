const express = require('express');
const path = require('path');
const { ObjectId } = require('mongodb');

const connectDB = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/login.html'));
});
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/login.html'));
});

router.get('/err',(req,res)=>{
    res.sendFile(path.join(__dirname, '../pages/err.html'));
})
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/signUp.html'));
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await connectDB();
        const users = db.collection('users');

        const user = await users.findOne({ email, password });

        if (!user) {
            return res.status(401).redirect('/err');
        }

        req.session.user = {
            id: user._id.toString()
        }

        req.session.save(() => {
            res.redirect('/welcome');
        })
    } catch (err) {
        console.error(err);
        res.status(500).redirect('/err');
    }
});

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const db = await connectDB();
        const users = db.collection('users');

        const exists = await users.findOne({ email });

        if (exists) {
            return res.status(409).redirect('/');
        }

        const result = await users.insertOne({
            username,
            email,
            password
        })

        req.session.user = {
            id: result.insertedId.toString()
        };
        req.session.save(() => {
            res.status(302).redirect('/welcome');
        })
    } catch (err) {
        console.error(err);
        res.status(500).redirect('/err');
    }
})
router.get('/welcome', authMiddleware, async (req, res) => {
    try {
        const db = await connectDB();
        const users = db.collection('users');

        const user = await users.findOne({
            _id: new ObjectId(req.session.user.id)
        })

        res.status(200).render('welcome', { username: user?.username || 'Guest' });
    } catch (err) {
        console.error(err);
        res.status(302).redirect('/err');
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});
router.use((req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'../pages','404.html'));
})
module.exports = router;
