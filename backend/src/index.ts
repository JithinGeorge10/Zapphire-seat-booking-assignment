import express from "express";
// import userRouter from "./routes/userRoutes";
import { FRONTEND_URL, PORT } from "./utils/constants";
import client from './config/database'
import cors from "cors";
import cookieParser from 'cookie-parser';
const app = express();
client.connect();
const corsOptions = {
  origin: FRONTEND_URL() || "*",
  credentials: true,
};

app.use(cors(corsOptions)); 
    
app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send('hi')
})
//app.use("/api/user/", userRouter);

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
