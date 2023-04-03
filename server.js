const express = require('express')
const colors= require('colors')
const moragan = require('morgan')
const dotenv= require('dotenv');
const connectDB = require('./config/db');


//config dotenv
dotenv.config();
//mongodb connection
connectDB();
// rest object
const app=express()

//middlewares
app.use(express.json())
app.use(moragan('dev'))

//routes
app.use('/api/v1/user', require("./routes/userRoutes"));
app.use('/api/v1/admin', require("./routes/adminRoutes"));
//port
const port = process.env.PORT || 8080

//listen port 

app.listen(port ,()=>{
    console.log(
        `Server Runnig in ${process.env.NODE_MODE}  Mode on port ${process.env.PORT}`
        .bgCyan.white
        );
    });
