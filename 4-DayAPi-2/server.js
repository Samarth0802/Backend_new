const app = require('./src/app')
const cors = require('cors')

app.use(cors())

const notes = []

// GET all notes
app.get('/notes', (req, res) => {
    res.json(notes)
})

// POST new note
app.post('/notes', (req, res) => {
    notes.push(req.body)
    res.json({ message: "Note Created Successfully", notes })
})

// DELETE note
app.delete("/notes/:index", (req, res) => {
    notes.splice(req.params.index, 1)
    res.json({ message: "Note deleted Successfully", notes })
})

//UPDATE note
app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].description = req.body.description
    res.json({ message: "Note Updated Successfully", notes })
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})