import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Movie from './pages/Movie'
import Home from './pages/Home'
function App() {

  
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/:movie" element={<Movie />} />
    </Routes>
  )
  
}

export default App


/*  Chatpgt: https://chatgpt.com/share/69b31fdc-f440-8004-adab-89224bccdf82
    Gemini: noen av filmene mistet bildet sitt og informasjon i movie.jsx.  https://gemini.google.com/share/4539b3942882
    Jeg fikk hjelp av Isabel Tapper til å få vist placeholder-bilde når det ikke finnes noe annet bilde.
    Søkte på nett underveis for småfeil, og brukte stort sett oversikten øverst på google som hjelp til disse småfeilene. 
    Brukte også LMS webtricks underveis for å løse små problemer.
*/

