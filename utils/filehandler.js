const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname,'..','users.json');

function getUsers() {
    if (!fs.existsSync(filePath)) {
        return;
    }

    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

function saveUsers(users) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}
module.exports = { getUsers, saveUsers };