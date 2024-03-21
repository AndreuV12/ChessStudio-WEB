import './Header.css';
import Logo from "../../assets/Logo.png"
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllContexts } from '../../hooks/Context';
import Btn from '../../components/Common/Btn/Btn';

const Header = ({onToggleSidebar, login, logout}) => {
    const navigate = useNavigate() 
    const { user } = useAllContexts()
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
                            <span>{`Hi ${user.username}!`}</span>
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