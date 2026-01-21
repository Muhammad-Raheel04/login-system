const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const publicUsersPath = path.join(__dirname, '../public/js/publicUsers.json');

const { getUsers, saveUsers } = require('../utils/filehandler');
const authMiddleware = require('../middleware/authMiddleware');
const { NetworkResources } = require('inspector/promises');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/login.html'));
});
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/login.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/signUp.html'));
})

router.get('/success', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/success.html'));
})

router.get('/welcome', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/welcome.html'));
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
        return res.redirect('/err');
    }

    req.session.user = {
        id: user.id,
        email: user.email
    }

    return res.redirect('/welcome');
});

router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    const users = getUsers();
    const exists = users.find(u => u.email === email);

    if (exists) {
        return res.redirect('/');
    }

    const newUser = {
        id: users.length + 1,
        username,
        email,
        password
    }
    users.push(newUser);

    saveUsers(users);

    const folderPath = path.dirname(publicUsersPath);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }


    let publicUsers = [];
    if (fs.existsSync(publicUsersPath)) {
        const data = fs.readFileSync(publicUsersPath, 'utf-8').trim();
        if (data) {
            try {
                publicUsers = JSON.parse(data);
            } catch (err) {
                console.error("Error parsing publicUsers.json:", err);
                publicUsers = [];
            }
        }
    }

    publicUsers.push({
        id: newUser.id,
        username: newUser.username
    })

    fs.writeFileSync(publicUsersPath, JSON.stringify(publicUsers, null, 2));

    req.session.user = { id: newUser.id, email: newUser.email };
    return res.redirect('/success');
})

router.get('/api/user', authMiddleware, (req, res) => {
    const userId = req.session.user.id;
    let publicUsers = [];
    if (fs.existsSync(publicUsersPath)) {
        const data = fs.readFileSync(publicUsersPath, 'utf-8').trim();
        if (data) publicUsers = JSON.parse(data);
    }
    const user = publicUsers.find(u => u.id === userId);
    res.json({ username: user ? user.username : "Guest" });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
