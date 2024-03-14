import React from 'react';
import './Header.css';
import Logo from "../../../assets/Logo.png"

const Header = ({userInfo, onToggleSidebar, login, logout}) => {
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
                    <button className="textButton" onClick={login}>
                        LogIn
                    </button>
                )}
                </div>
        </div>
    );
};

export default Header;