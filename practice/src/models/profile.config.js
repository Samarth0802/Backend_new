const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    username:String,
    password:String,
    img:String,
})

const profileModel = mongoose.model('profiles',profileSchema)

module.exports = profileModel