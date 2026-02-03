const express  = require('express')
const cors = require('cors')

const multer = require('multer')
const app = express()
app.use(express.json())
app.use(cors())


const upload = multer({storage:multer.memoryStorage()})
const postModel = require('./config/posts.model')
const uploadFile = require('./services/upload.service')

app.post('/create-post',upload.single("image"),async (req,res)=>{
    console.log(req.body)
    console.log(req.file)
    const {caption} = req.body
    const imageValue = await uploadFile(req.file.buffer)
    const response = await postModel.create({
        'image':imageValue.url,
        'caption':caption,
    })

    res.status(201).json({
        "message":"Post Created Successfully",
        response
    })
})

app.get('/create-post',async(req,res)=>{
    const posts = await postModel.find();
    console.log(posts)
    res.status(200).json({
        "message":"Posts Fetched Successfully",
        posts
    })
})

module.exports = app