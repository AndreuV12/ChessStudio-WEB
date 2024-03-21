import './SignUpForm.css';
import axios from "axios"
import { SERVER_URL } from "../../../config/config";
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllContexts } from "../../../hooks/Context";
import TextField from '../TextField/TextField';
import Btn from '../Btn/Btn';

const SignUpForm = () => {
    const navigate = useNavigate()
    const {user, setUser} =  useAllContexts()
    
    const usernameRef = useRef(null)
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)

    const [submitLoading, setSubmitLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false) 
    const [errorMsg, setErrorMsg] = useState(false)
    
    const required = (v) => (!!v)

    const handleSubmit = (event) => {
        event.preventDefault();
        const username = usernameRef.current.value
        const email = emailRef.current.value 
        const password = passwordRef.current.value

        // validacion del formulario
        const validUsername = required(username)
        const validEmail = required(email)
        const validPassword = required(password)
        
        if (!validUsername){
            setUsernameError(true)
        }
        if (!validEmail){
            setEmailError(true)
        }
        if (!validPassword){
            setPasswordError(true)
        }
        if (validUsername && validEmail && validPassword){
            handleSignUp(username, email, password)
        }
    };

    const handleSignUp = async (username, email, password) => {
        setSubmitLoading(true)
        await axios.post(`${SERVER_URL}signup`, {
            username,
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
        <div className='SignUpContainer'>
            <div className='SignUpForm'>
                <h1>SIGN UP</h1> 
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <TextField
                            ref={usernameRef}
                            label='Username'
                            rules={required}
                            error={usernameError}
                            setError={setUsernameError}
                        />
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
                    <Btn className="SubmitBtn" type="submit" loading={submitLoading}>Sign Up</Btn>
                </form>

                <div className='HaveAccountContainer' onClick={()=>navigate('/signup')}>
                    <span>Already have an acount?</span>
                    <Btn className="LogInBtn">Log In</Btn>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;