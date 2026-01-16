const express = require('express');
const path = require('path');
const app = express();

const { getUsers, saveUsers } = require('./utils/filehandler');

// middleware to read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, resp) => {
    resp.sendFile(path.join(__dirname, 'pages', 'login.html'));
})
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'signUp.html'));
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        return res.redirect('/success');

    }
    res.redirect('/err')

})
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    const users = getUsers();
    console.log("Before sign up "+users);

    const exists = users.find(u => u.email === email);

    if (exists) {
        return res.redirect('/'); // user already exists
    }

    const newUser = {
        id: users.length + 1,
        username,
        email,
        password
    }
    users.push(newUser);
    saveUsers(users);
    console.log("after sign up "+users);
    return res.redirect('/');
})
app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'success.html'));
})
app.get('/err', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'err.html'));
})
app.listen(3200, () => {
    console.log("Visit http://localhost:3200 ");
})