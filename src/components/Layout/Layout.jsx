import React, { useState} from 'react';
import './Layout.css';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

const Layout = ({userInfo, logout}) => {
    const [sidebarOpened, setSidebarOpened] = useState(true)

    const toggleSidebar = () => {
        setSidebarOpened(!sidebarOpened)
    }

    return (
        <>
            <Header userInfo={userInfo} onToggleSidebar={toggleSidebar} logout={logout}/>
            <Sidebar sidebarOpened={sidebarOpened} toggleSidebar={toggleSidebar} />
        </>
    );
};

export default Layout;