const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const routes = require("./routes");


const app = express()

app.use(cors());
app.use(express.json())


const PORT = process.env.PORT || 8000;


mongoose.connect(process.env.MONGODB_URL).then
(()=>{
    console.log('DATABASE CONNECTED SUCCESSFULLY')
    app.listen(PORT, ()=>{
    console.log(`server started running at PORT ${PORT}`)
})
})


app.get('/', (req, res)=>{
    res.status(200).json({
        msg: 'Welcome to Diabetes Detection System'
    })
})

app.use('/api', routes)


app.use((req, res)=>{
    return res.status(404).json({message: 'This Endpoint does not exist'})
})
