const { MongoClient } = require('mongodb');



let db;
async function connectDB() {
    if (db) {
        return db;
    }
    const client = new MongoClient(process.env.MONGO_URL, {
        tls: true
    });

    await client.connect();
    db = client.db(process.env.DB_NAME || 'users');
    console.log("MongoDB connected");
    return db;
}
module.exports = connectDB;