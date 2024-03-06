import React from 'react';
import './OpeningItem.css';
import Board from '../../Board/Board';
import { Link } from 'react-router-dom';

const OpeningItem = ({name, link, children}) => {
    return (
        <Link className="OpeningItem" to={link}>
            {children}
            <span>{name}</span>
        </Link>
    );
};

export default OpeningItem;