import 'dotenv/config'
import express from 'express';
import userRoute from './routes/userRoute.js';
import connectDB from './database/db.js';
import cors from 'cors';
const app =express();
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true 
}));
app.use('/api/v1/user',userRoute);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`visit ${PORT}`);
    connectDB();
})