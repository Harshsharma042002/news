import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import userRouter from './routes/user.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (_, res) => {
    res.send("Hi, this is Express");
});

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/user', userRouter);

app.listen(PORT, () => {
    connectDb();
    console.log(`Server running at ${PORT}`);
});
