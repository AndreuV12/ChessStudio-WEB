import React from 'react';
import './Header.css';
import Logo from "../../assets/ChessStudio_logo.png"
const Header = ({onToggleSidebar}) => {
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
                <button className="textButton">
                    LogIn
                </button>
                <button className="textButton">
                    SignUp
                </button>
            </div>
        </div>
    );
};

export default Header;