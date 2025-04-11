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

app.use(cors({
    origin: (origin, callback) => {
      const allowedOrigins = ['https://zapphire-seat-booking-assignment.vercel.app'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));
  

    
app.use(express.json());
app.use(cookieParser());
app.use("/api/user/", userRouter);

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
