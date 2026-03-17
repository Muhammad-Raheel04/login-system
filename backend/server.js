import 'dotenv/config'
import express from 'express';
import userRoute from './routes/userRoute.js';

const app =express();
app.use(express.json());

app.use('/api/v1/user',userRoute);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`visit ${PORT}`);
})