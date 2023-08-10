import express from 'express';
import Colors from 'colors';
import dotenv from 'dotenv';
import ConnectDB from './config/db.js';
import morgan from 'morgan';
import userRoute from './routes/userRoute.js'
import doctorRoute from './routes/doctorRoute.js'
import nurseRoute from './routes/nurseRoute.js'
import volRoute from './routes/volRoute.js'


//configration env
dotenv.config();

//rest object
const app = express()

//middelwares
app.use(express.json())
app.use(morgan('dev'))

//database connect
ConnectDB();

//routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/auth", doctorRoute);
app.use("/api/v1/auth", nurseRoute);
app.use("/api/v1/auth", volRoute);

//rest api create
app.get('/',(req,res) =>{
    res.send("<h1>Welcome to hospital aid app</h1>");
// res.send({
//     // message:"Welcome to ecommerce app";
// })
})

//port
const Port = process.env.Port || 8080;
//run server
app.listen(Port,() =>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${Port}`.bgCyan.white);
})