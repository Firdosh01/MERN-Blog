import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB is connected");
}).catch((error) => {
    console.log(error);
});

const app = express();

const PORT = 4000;  // Specify the port number

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});