import express from "express";
import userRouter from "./routes/userRoutes";
import { FRONTEND_URL, PORT } from "./utils/constants";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { sequelize } from './config/database';

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync(); 
        console.log('Database synced.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

connectDB();

const app = express();

const corsOptions = {
  origin: FRONTEND_URL() || "*",
  credentials: true,
};

app.use(cors(corsOptions)); 
    
app.use(express.json());
app.use(cookieParser());
app.use("/api/user/", userRouter);

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
