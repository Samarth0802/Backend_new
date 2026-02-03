import React from 'react'
import '../styles/CreatePost.css'
import { useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
const CreatePost = () => {
    const [caption, setCaption] = useState('')
    const navigate = useNavigate()

    async function submitForm(e){
        e.preventDefault()
        
        const formData = new FormData(e.target)
        const response = await axios.post('http://localhost:3000/create-post',formData)
        console.log(response)
        e.target.reset()
        setCaption('')
        navigate('/show-post')
    }

  return (
    <div className='create-post'>
      <form className='post-form' onSubmit={(e)=>{
        submitForm(e)
      }}>
        <input type="file" name='image' accept='image/*'/>
        <input type="text" name='caption' placeholder='Enter Caption' autoComplete='off' value={caption} onChange={(e)=>{
            setCaption(e.target.value)
        }} />
        <button>Create Post</button>
      </form>
    </div>
  )
}

export default CreatePost
