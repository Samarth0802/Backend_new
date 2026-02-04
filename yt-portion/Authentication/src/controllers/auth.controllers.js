const userModel = require('../models/users.model')
const jwt = require('jsonwebtoken')

async function registerUser(req,res){
    const {username,password,email} = req.body

    const user = await userModel.create({
        username,password,email
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_TOKEN)

    res.status(201).json({
        "message":"User Created Successfully",
        user,
        token
    })
}

module.exports = {registerUser}