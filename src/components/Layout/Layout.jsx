import React, { useState} from 'react';
import './Layout.css';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

const Layout = () => {
    const [sidebarOpened, setSidebarOpened] = useState(true)

    const toggleSidebar = () => {
        setSidebarOpened(!sidebarOpened)
        console.log("TOGGLE SIDEBAR",sidebarOpened);
    }

    return (
        <>
            <Header onToggleSidebar={toggleSidebar}/>
            <Sidebar sidebarOpened={sidebarOpened} toggleSidebar={toggleSidebar} />
        </>
    );
};

export default Layout;