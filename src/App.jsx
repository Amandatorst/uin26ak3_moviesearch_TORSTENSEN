import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Movie from './pages/Movie'
import Home from './pages/Home'
function App() {

  
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path=":movie" element={<Movie />} />
    </Routes>
  )
  
}

export default App


/*  Chatpgt: https://chatgpt.com/share/69b31fdc-f440-8004-adab-89224bccdf82
    Lenke til bakgrunnsbilde: https://no.pinterest.com/pin/9148005521956875/
*/

