const express = require('express')
const profileModel = require('./models/profile.config')

const app = express();
app.use(express.json())

app.post('/createProfile',async (req,res)=>{
    const {img,username,password} = req.body;

    const profile = await profileModel.create({
        img,username,password
    })
    
    res.status(201).json({
        message:"Profile Created Successfully",
        profile
    })
})

app.get('/createProfile',async (req,res)=>{
    const profiles = await profileModel.find()
    res.status(200).json({
        "message":"Fetched Profiles Successfully",
        profiles
    })
})
module.exports = app