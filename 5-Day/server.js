const app = require('./src/app')


const notes = []

app.post('/notes',(req,res)=>{
    notes.push(req.body)

    res.status(201).json({
        message:"Note Created Successfully"
    })
})

app.get('/notes',(req,res)=>{
    res.status(200).json({
        message:"Notes Fetched Successfully",notes
    })
})

app.delete('/notes/:idx',(req,res)=>{
    notes.splice(req.params.idx,1)
    
    res.status(200).json({
        message:"Note Deleted successully",
    })
})

app.patch('/notes/:idx',(req,res)=>{
    notes[req.params.idx].description = req.body.description

    res.status(200).json({
        message:"Note updated Successfully",notes
    })
})

app.listen(3000,()=>{
    console.log("Server is listening to 3000")
})


