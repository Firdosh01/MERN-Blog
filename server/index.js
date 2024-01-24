import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
const app = express();
dotenv.config();
const PORT = 4000;
import userRoutes from './routes/User.js'

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB is connected");
}).catch((error) => {
    console.log(error);
});

/* routes */

app.use('/api/user', userRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});