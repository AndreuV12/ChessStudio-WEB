import React, { useState, useEffect } from 'react';
import './Sidebar.css';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Sidebar = ({sidebarOpened, toggleSidebar}) => {
    const location = useLocation();

    useEffect(() => {
        if (sidebarOpened) toggleSidebar()
    }, [location.pathname])

    return (
        <div className={`Sidebar ${sidebarOpened ? 'open' : 'close'}`}>
            <div>
                <nav className="SidebarMenu">
                    <li> 
                        <Link className="Link" to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="Link" to="/about">About Us</Link>
                    </li>
                </nav>
            </div>
            <div onClick={toggleSidebar}>
            </div>
        </div>
    )
};

export default Sidebar;