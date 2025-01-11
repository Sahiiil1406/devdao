import dotenv from 'dotenv';
dotenv.config()
import express from "express"
import connectToDatabase from './db/db.js';
const port = process.env.PORT

connectToDatabase()

const app = express()

app.get('/' , (req , res)=>{
    res.send("Api is up and running!!⚙️")
})

app.listen(port , ()=>{
    console.log(`Server is running at port ${port} 🪛`)
})