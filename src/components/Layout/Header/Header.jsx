import React from 'react';
import './Header.css';
import Logo from "../../../assets/Logo.png"

import { SERVER_URL } from '../../../config/config';
const Header = ({userInfo, onToggleSidebar, logout}) => {
    return (
        <div className='Header'>
            <div>
                <button 
                    className="MenuButton"
                    onClick={onToggleSidebar}
                >
                    <i className="fa-solid fa-bars"></i>
                </button>
                <img 
                    className="Logo"
                    alt='logo'
                    src={Logo}
                />
            </div>
            
            <div className="Buttons">
                { userInfo ? (
                    <> 
                        <span>{`Hi ${userInfo.username}!`}</span>
                        <button className="logout" onClick={logout}>
                            LogOut
                        </button>
                    </>
                ) : (
                    <a href={`${SERVER_URL}oauth/google`} className="textButton">
                        LogIn
                    </a>
                )}
                </div>
        </div>
    );
};

export default Header;