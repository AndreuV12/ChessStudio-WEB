import React from 'react';
import './OpeningItem.css';
import Board from '../../Board/Board';
import { Link } from 'react-router-dom';

const OpeningItem = ({pos, name, link}) => {
    return (
        <div className="OpeningItem">
            <Link to={link}>
                <Board pos={pos}></Board>
            </Link>
            <span>{name}</span>
        </div>
        
    );
};

export default OpeningItem;