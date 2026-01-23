const express = require('express')
const catMe = require('cat-me')

const app = express()

app.get('/',(req,res)=>{
    res.send(catMe())
})  

app.listen(4000)