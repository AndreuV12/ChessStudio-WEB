import axios from "axios"
import { SERVER_URL } from "../../../config/config";
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllContexts } from "../../../hooks/Context";
import TextField from '../TextField/TextField';
import Btn from '../Btn/Btn';
import './LogInForm.css';
const LogInForm = () => {
    const navigate = useNavigate()
    const {user, setUser} =  useAllContexts()
    
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [submitLoading, setSubmitLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false) 
    const [errorMsg, setErrorMsg] = useState(false)
    
    const required = (v) => (!!v)

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = emailRef.current.value 
        const password = passwordRef.current.value
        // validacion del formulario
        const validEmail = required(email)
        const validPassword = required(password)
        
        if (!validEmail){
            setEmailError(true)
        }
        if (!validPassword){
            setPasswordError(true)
        }
        if (validEmail && validPassword){
            handleLogin(email, password)
        }
    };

    const handleLogin = async (email, password) => {
        setSubmitLoading(true)
        await axios.post(`${SERVER_URL}login`, {
            email, 
            password
        })
        .then((res)=>{
            localStorage.setItem('token',res.data.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            axios.get(`${SERVER_URL}users/me`)
            .then((response)=> {
                setUser(response.data)
                navigate('/')
            })
        })
        .catch((error)=>{
            setErrorMsg(error.response?.data?.error || 'Credenciales Invàlidas');
        })
        setSubmitLoading(false)
    }

    return (
        <div className='LogInContainer'>
            <div className='LogInForm'>
                <h1>LOGIN</h1> 
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <TextField
                            ref={emailRef}
                            label='Email'
                            rules={required}
                            error={emailError}
                            setError={setEmailError}
                        />
                        <TextField
                            ref={passwordRef}
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            rules={required}
                            error={passwordError}
                            setError={setPasswordError}
                            rigthIcon={<i onClick={()=>setShowPassword(!showPassword)} className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>}
                        />
                        
                    </div>
                    {errorMsg && <span className="ErrorMsg">{errorMsg}</span>}
                    <Btn className="SubmitBtn" type="submit" loading={submitLoading}>Log In</Btn>
                </form>
                <Btn className="ForgotPwdBtn" onClick={()=>navigate('/password-recovery')}> Forgot password? </Btn>

                <div className='CreateAccountContainer'>
                    <span>Don't have an account?</span>
                    <Btn onClick={()=>navigate('/signup')} className="SignUpBtn">Create</Btn>
                </div>
            </div>
        </div>
    );
};

export default LogInForm;