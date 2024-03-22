import './Sidebar.css';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAllContexts } from '../../hooks/Context';

const Sidebar = ({sidebarOpened, toggleSidebar}) => {
    const location = useLocation();
    const { user } = useAllContexts()
    console.log(user);
    useEffect(() => {
        if (sidebarOpened) toggleSidebar()
    }, [location.pathname])

    return (
        <div onClick={toggleSidebar} className={`SidebarMenu ${sidebarOpened ? 'open' : 'close'}`}>
            <div onClick={(event)=>event.stopPropagation()}className="SidebarContent">
                <div className="SidebarHeader">
                <i className="fa-solid fa-user"></i>
                <h1>{user?.username}</h1>
                </div>
                <nav className="SidebarLinks">
                    <li>
                        <Link className="Link" to="/">Openings</Link>
                    </li>
                    <li> 
                        <Link className="Link" to="/contact">
                            Contact
                        </Link>
                    </li>
                </nav>
            </div>            
        </div>
    )
};

export default Sidebar;