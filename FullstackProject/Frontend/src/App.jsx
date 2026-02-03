import React, { useState, useEffect } from 'react'
import axios from 'axios'


const API_URL = 'http://localhost:3000/notes'

const App = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetchTasks()
  }, []) 

  async function fetchTasks() {
    try {
      const response = await axios.get(API_URL)
      setTasks(response.data.notes)
      //console.log(tasks)// backend jo bheja hai wo array mein store ho jaata hai
    } catch (error) {
      console.error('GET error:', error)
    }
  }

  // ✅ POST — form submit hone pe naya task backend mein bhejte hain
  async function submitForm(e) {
    e.preventDefault()

    if (!title || !description) return

    try {
      const response = await axios.post(API_URL, {
        title: title,
        description: description
      })

      // POST ke baad dobara GET karke updated list le lete hain
      fetchTasks()

      // fields clear karo
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error('POST error:', error)
    }
  }

  async function updateTask(id){
    const desc = prompt("Enter the description to update.")
    if(!desc){
      return
    }
    try{
      await axios.patch(`http://localhost:3000/notes/${id}`,{
      description:desc
      })
      fetchTasks()
    }
    catch(error){
      console.log("Error ",error)
    }
  }

  async function deleteTask(id){
    try{
      await axios.delete(`http://localhost:3000/notes/${id}`)
      fetchTasks()  
    }
    catch(error){
      console.log("Error ", error)
    }
  }

  return (
    <div className="completeForm">
      {/* POST PART */}
      <div className="submitPart">
        <form onSubmit={(e) => submitForm(e)}>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button>Add Task</button>
        </form>
      </div>

      {/* GET PART — backend se aaya hua data display */}
      <div className="taskList">
        {tasks.length === 0 ? (
          <p className="noTask">Enter a new Task</p>
        ) : (
          tasks.map((task) => (
            <div className="taskCard" key={task._id || task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <i className="ri-delete-bin-3-line" onClick={()=>{
                deleteTask(task._id)
              }}></i>  
              <i className="ri-edit-line" onClick={()=>{
                console.log(task._id)
                updateTask(task._id)
              }}></i>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App