import { useState } from 'react'
import { Nav } from './components/Navbar.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";


function App() {

  return (
    <main className='dark:bg-gray-900 w-full min-h-screen flex flex-col'>
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
