import React, { useState} from 'react';
import './Layout.css';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

const Layout = ({userInfo, login, logout}) => {
    const [sidebarOpened, setSidebarOpened] = useState(true)

    const toggleSidebar = () => {
        setSidebarOpened(!sidebarOpened)
    }

    return (
        <>
            <Header userInfo={userInfo} onToggleSidebar={toggleSidebar} login={login} logout={logout}/>
            <Sidebar sidebarOpened={sidebarOpened} toggleSidebar={toggleSidebar} />
        </>
    );
};

export default Layout;