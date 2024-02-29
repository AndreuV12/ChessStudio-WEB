import './App.css'
import Board from './components/Board/Board'
// import Header from './components/Board/Square/Header/Header'
// import Sidebar from './components/Layout/Sidebar/Sidebar'

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import axios from "axios"
axios.defaults.withCredentials = true;

import { SERVER_URL } from './config/config'

import Layout from './components/Layout/Layout'
function App() {
  console.log("AppJS");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      if (!isLoggedIn){
        console.log("AXIOS");
        axios.get(`${SERVER_URL}users/me`)
        .then((response)=> {
          setUserInfo(response.data);
          setIsLoggedIn(true);
        })
        .catch ((error) => {
          setIsLoggedIn(false);
        })
      }
    }
    checkSession();
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Layout/>
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
