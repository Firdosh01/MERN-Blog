import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './routes/User.js'
import authRoutes from './routes/Auth.js'
import cors from "cors";
const app = express();
app.use(express.json());
dotenv.config();
const PORT = 4000;

app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)
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
app.use('/api/auth', authRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});