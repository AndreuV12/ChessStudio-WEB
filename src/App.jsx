import './App.css'

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import axios from "axios"
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

import { SERVER_URL } from './config/config'

import Layout from './components/Layout/Layout'
// import OpeningList from './components/OpeningList/OpeningList'
import OpeningListPage from './pages/openingsListPage';
import OpEditor from './components/OpEditor/OpEditor'

function App() {
  console.log("AppJS");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  
  useEffect(() => {
    checkSession();
  }, [])

  const checkSession = async () => {
    const token = localStorage.getItem('token')
    if (token){
      axios.get(`${SERVER_URL}users/me`)
      .then((response)=> {
        setIsLoggedIn(true)
        setUserInfo(response.data)
      })
      .catch((err)=>{
        console.log("session No iniciada")
      })
    }
  }
  
  const login = () => {
    axios.get(`${SERVER_URL}login`)
    .then((res)=>{
      localStorage.setItem('token',res.data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      checkSession()
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization'];
    setUserInfo(null)
    setIsLoggedIn(false)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Layout userInfo={userInfo} login={login} logout={logout}/>
        <Routes>
          {/* <Route path="/" element={<Board/>}/> */}
          <Route path="/" element={<OpeningListPage/>}/>
          <Route path="/contact" element={
            <div>
              <h1> Contact</h1>
              <h2>Page  under construction</h2>
            </div>
          }/>
          <Route path="/openings/:id" element={<OpEditor/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
