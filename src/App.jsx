import './App.css'

import Layout from './components/Layout/Layout'
import Board from './components/Board/Board'
import OpeningList from './components/OpeningList/OpeningList'

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import axios from "axios"
axios.defaults.withCredentials = true;

import { SERVER_URL } from './config/config'
import QweenGambit from './components/OpeningDetail/QweenGambit/QweenGambit'

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

  const logout = () => {
    axios.get(`${SERVER_URL}oauth/google/logout`)
    .then((response)=> {    
      setUserInfo(null)
    })
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Layout userInfo={userInfo} logout={logout}/>
        <Routes>
          {/* <Route path="/" element={<Board/>}/> */}
          <Route path="/" element={<OpeningList/>}/>
          <Route path="/contact" element={
            <div>
              <h1> Contact</h1>
              <h2>Page  under construction</h2>
            </div>
          }/>
          <Route path="/openings/qween-gambit" element={<QweenGambit/>}/>
          <Route path="/openings/italian-game" element={
            <div>
              <h1> Italian Game</h1>
              <h2>Page under construction</h2>
            </div>
          }/>
          <Route path="/openings/french-defense" element={
            <div>
              <h1> French Defense</h1>
              <h2>Page under construction</h2>
            </div>
          }/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
