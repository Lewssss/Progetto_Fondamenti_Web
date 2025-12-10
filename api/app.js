import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, (req,res) => {
    console.log(`Server is running on port ${port}`);
});

connectDB();
app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json()) 


//chiamate ENDPOINTS

//app.use('/utenti',UserController)

