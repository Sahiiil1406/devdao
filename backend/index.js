// import dotenv from 'dotenv';
// dotenv.config()
// import express from "express"
// import connectToDatabase from './db/db.js';
// const port = process.env.PORT
const express = require('express')
const connectToDatabase = require('./db/db.js')
require('dotenv').config()
const questionRoutes = require('./routes/question.routes')
const cors=require('cors')

const port = process.env.PORT
const app = express()

connectToDatabase()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.use('/api',questionRoutes)

app.get('/' , (req , res)=>{
    res.send("Api is up and running!!⚙️")
})

app.listen(port , ()=>{
    console.log(`Server is running at port ${port} 🪛`)
})