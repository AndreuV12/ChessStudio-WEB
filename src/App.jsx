import './App.css'
import axios from "axios"
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAllContexts } from './hooks/Context';
import { SERVER_URL } from './config/config'

import Layout from './Layout/Layout'
import LogInForm from './components/Common/LogInForm/LogInForm';
import SignUpForm from './components/Common/SignUpForm/SignUpForm';
import OpeningListPage from './pages/openingsListPage';
import OpeningEditoPage from './pages/openingEditorPage';
import OpCreator from './components/OpCreator/OpCreator';

function App() {

  const { user, setUser } = useAllContexts()
  useEffect(() => {
    checkSession();
  }, [])

  const checkSession = async () => {
    const token = localStorage.getItem('token')
    if (token){
      axios.get(`${SERVER_URL}users/me`)
      .then((response)=> {
        setUser(response.data)
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

  return (
    <div className="App">
      <BrowserRouter>
        <Layout userInfo={user} login={login}/>
        <Routes>
          <Route path="/login" element={<LogInForm/>}/>
          <Route path="/signup" element={<SignUpForm/>}/>
          <Route path="/" element={<OpeningListPage/>}/>
          <Route path="/openings/new" element={<OpCreator/>}/>
          <Route path="/openings/:id" element={<OpeningEditoPage/>}/>
          <Route path="*" element= {<h1>Page  under construction</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
