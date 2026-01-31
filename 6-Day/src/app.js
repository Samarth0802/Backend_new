//server create krna
// server config krna
const express  = require('express')

const app = express()
const noteModel = require('./models/notes.model')

app.use(express.json());

app.post("/notes",async (req,res)=>{
    const {title,description} = req.body;
    
    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message:'Note Created Successfully',
        note
    })
})

app.get("/notes", async (req, res) => {

  const notes = await noteModel.find({
    _id: "697e2551056494880e5e6c6b"
  });

  res.status(200).json({
    message: "Note Fetched Successfully",
    notes
  });
});


module.exports = app