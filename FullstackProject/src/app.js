const express = require('express')

const app = express();
const notesModel = require('./models/notes.model')
app.use(express.json());


app.post('/notes',async (req,res)=>{
    const {title,description} = req.body
    const note = await notesModel.create({
        title,description
    })
    res.status(201).json({
        "message":"Note created Successfully",
        note
    })
})

app.get("/notes",async (req,res)=>{
    const notes = await notesModel.find()
    res.status(200).json({
        "message":"Note fetched Successfully",
        notes
    })
})

app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;
  //console.log(id)
  const updatedNote = await notesModel.findByIdAndUpdate(
    id,
    req.body,
    { new: true }  // updated and latest data aaega updatedNote m
  );

  res.status(200).json({
    message: "Note Updated Successfully",
    updatedNote
  });
});

app.delete("/notes/:id",async(req,res)=>{
    const id = req.params.id;
    const deletedNote  =await notesModel.findByIdAndDelete(
        id,
        //{new:true}
    )
    res.status(200).json({
        "message":"Note deleted Successfully",
        deletedNote
    })
})


module.exports = app