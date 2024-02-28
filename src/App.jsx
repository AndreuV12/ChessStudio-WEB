import './App.css'
import Board from './components/Board/Board'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [SidebarOpened, setSidebarOpened] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpened(!SidebarOpened)
    console.log("S",SidebarOpened);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header onToggleSidebar={toggleSidebar}></Header>
        <Sidebar isOpen={SidebarOpened} toggleSidebar={toggleSidebar}/>
        <Routes>
          <Route path="/" element={<Board/>}/>
          <Route path="/about" element={<h1>About US</h1>}/>
          **<Route path="/a/:id" element={<h1> A</h1>}/>**
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
