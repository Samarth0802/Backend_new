import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('savedNotes')
    return saved ? JSON.parse(saved) : []
  })

  const [newTitle, setnewTitle] = useState('')
  const [newDescription, setnewDescription] = useState('')

  useEffect(function(){
    async function fetchNotes(){
      const response = await axios.get('https://three-day.onrender.com/notes')
      setNotes(response.data)
    }
    fetchNotes()
  }, [])

  useEffect(() => {
    localStorage.setItem('savedNotes', JSON.stringify(notes))
  }, [notes])

  // Submit form
  async function submitForm(e){
    e.preventDefault()
    
    if (!newTitle.trim() || !newDescription.trim()) {
      alert('Please fill both fields!')
      return
    }
    
    await addNote()
  }
  async function deleteNote(index){
    let response = await axios.delete(`https://three-day.onrender.com/notes/:${index}`)
    setNotes(response.data.notes)
    console.log(index)
  }

  async function updateNote(index){
    let description = prompt("Enter new description")
    let response = await axios.patch(`https://three-day.onrender.com/notes/${index}`,{
      description:description
    })
    setNotes(response.data.notes)
  }

  async function addNote(){
    try {
      const response = await axios.post('http://localhost:3000/notes', {
        title: newTitle,
        description: newDescription
      })
      
      console.log('Response:', response.data.notes)
      
      setNotes(response.data.notes)
      setnewTitle('')
      setnewDescription('')
      
    } catch (error) {
      console.error('Error adding note:', error)
      alert('Failed to add note!')
    }
  }

  return (
    <div className='w-full min-h-screen bg-black'>
      <form className='w-full px-10 py-10 flex flex-col gap-10' onSubmit={submitForm}>
        <div className='flex w-full gap-2'>
          <input 
            type="text" 
            placeholder='Enter the Title' 
            className='rounded-lg text-amber-50 bg-gray-700 w-1/2 px-5 py-2 outline-none border-2 border-black placeholder:text-white placeholder:opacity-50 focus:border-white focus:border-2' 
            value={newTitle} 
            onChange={(e) => setnewTitle(e.target.value)}
          />

          <input 
            type="text" 
            placeholder='Enter Description' 
            className='rounded-lg text-amber-50 bg-gray-700 w-1/2 px-5 py-2 outline-none border-2 border-black placeholder:text-white placeholder:opacity-50 focus:border-white focus:border-2' 
            value={newDescription} 
            onChange={(e) => setnewDescription(e.target.value)}
          />
        </div>

        <button 
          type="submit"
          className='bg-gray-600 text-white w-fit px-4 py-2 rounded-lg cursor-pointer active:scale-95'
        >
          Add note
        </button>
      </form>

      {/* Display Notes */}
      <div className='px-10'>
        <h2 className='text-white text-2xl mb-5'>Your Notes ({notes.length})</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {notes.map((note, index) => (
    <div 
      key={index}
      className='bg-gray-800 p-5 rounded-lg border-2 border-gray-700 flex flex-col gap-3'
    >
      {/* Title */}
      <h3 className='text-white text-xl font-bold break-words'>{note.title}</h3>
      
      {/* Description */}
      <p className='text-gray-300 break-words'>{note.description}</p>
      
      {/* Buttons */}
      <div className='flex gap-2 mt-2'>
        <button 
          className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer active:scale-95 transition-all'
          onClick={()=>deleteNote(index)}
        >
          Delete
        </button>
        <button 
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer active:scale-95 transition-all' onClick={()=>updateNote(index)}
        >
          Update
        </button>
      </div>
    </div>
))}
        </div>
      </div>
    </div>
  )
}

export default App