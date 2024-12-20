import express,{json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { adminRouter } from './Router/adminRouter.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app= express();
app.use(json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser());
app.use('/',adminRouter)
const PORT=process.env.port

app.listen(PORT,()=>{
    
    console.log("server listening on port ",PORT);
    
})


