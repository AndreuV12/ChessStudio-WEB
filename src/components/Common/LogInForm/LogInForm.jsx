import axios from "axios"
import { SERVER_URL } from "../../../config/config";
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../TextField/TextField';
import Btn from '../Btn/Btn';
import './LogInForm.css';
const LogInForm = () => {
    const navigate = useNavigate()
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);

    const [userError, setUserError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [submitLoading, setSubmitLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false) 
    const required = (v) => (!!v)

    const handleSubmit = (event) => {
        event.preventDefault();
        const userName = userNameRef.current.value 
        const password = passwordRef.current.value
     
        // validacion del formulario
        if (!required(userName)){
            setUserError(true)
        }
        if (!required(password)){
            setPasswordError(true)
        }
        if (!userError && !passwordError){
            handleLogin(userName, password)
        }
    };

    const handleLogin = async (username, password) => {
        setSubmitLoading(true)
        await axios.post(`${SERVER_URL}login`, {
            username, 
            password
        })
        .then((res)=>{
            localStorage.setItem('token',res.data.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            checkSession()
        })
        .catch((error)=>{
            console.log("Credenciales Invàlidas");
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
                            ref={userNameRef}
                            label='Username'
                            rules={required}
                            error={userError}
                            setError={setUserError}
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
                    <Btn className="SubmitBtn" type="submit" loading={submitLoading}>Log In</Btn>
                </form>
                <Btn className="ForgotPwdBtn" onClick={()=>navigate('/password-recovery')}> Forgot password? </Btn>

                <div className='CreateAccountContainer' onClick={()=>navigate('/signup')}>
                    <span>Don't have an account?</span>
                    <Btn className="SignUpBtn">Create</Btn>
                </div>
            </div>
        </div>
    );
};

export default LogInForm;