import './Header.css';
import axios from "axios"

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllContexts } from '../../hooks/Context';
import Logo from "../../assets/Logo.png"

import Btn from '../../components/Common/Btn/Btn';

const Header = ({onToggleSidebar, login}) => {
    const navigate = useNavigate() 
    const { user, setUser } = useAllContexts()

    const logout = () => {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization'];
        setUser(null)
      }
    return (
        <div className='Header'>
            <div>
                <Btn 
                    className="MenuButton"
                    onClick={onToggleSidebar}
                >
                    <i className="fa-solid fa-bars"></i>
                </Btn>
                <img 
                    className="Logo"
                    alt='logo'
                    src={Logo}
                />
            </div>
            
            <div className="ButtonsContainer">
                { user ? 
                    (
                        <> 
                            <span>{`${user.username}`}</span>
                            <Btn className="LogOutBtn" onClick={logout}>
                                Log Out
                            </Btn>
                        </>
                    ) : 
                    (
                        <>
                            <Btn className="LogInBtn" onClick={()=> navigate('/login')}>
                                Log In
                            </Btn>
                            <Btn className="SignUpBtn" onClick={()=> navigate('/signup')}>
                                Sign Up
                            </Btn>

                        </>
                    )
                }
                </div>
        </div>
    );
};

export default Header;