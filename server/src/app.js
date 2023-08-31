const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')
const mongoose=require('mongoose')
const router = require('./router')

require('dotenv').config()

app.use(cors({
    origin:'https://44.215.170.76:3000'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(router)



mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@lystloc.biyrjom.mongodb.net/master?retryWrites=true&w=majority`).then(res=>app.listen(process.env.PORT)).catch(err=>console.log(err))