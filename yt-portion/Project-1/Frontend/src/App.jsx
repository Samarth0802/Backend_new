import React from 'react'
import {Routes,Route} from 'react-router-dom'
import CreatePost from './Pages/CreatePost'
import ShowPost from './Pages/ShowPost'

const App = () => {
  return (
   <Routes>
      <Route path='/create-post' element={<CreatePost/>}/>
      <Route path='/show-post' element={<ShowPost/>}/>
   </Routes> 
  )
}

export default App
