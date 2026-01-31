const mongoose = require('mongoose')

const notesSchema = mongoose.Schema({
    title:String,
    description:String,
})

const noteModel = mongoose.model("notes",notesSchema)   // yha pr notes h collection ka naam and noteModel is used to perform CURD operations

module.exports = noteModel