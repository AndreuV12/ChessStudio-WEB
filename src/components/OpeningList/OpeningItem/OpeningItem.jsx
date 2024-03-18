import React from 'react';
import './OpeningItem.css';
import Board from '../../Board/Board';
import { Link } from 'react-router-dom';

const OpeningItem = ({name, link, children, onRemoveClick }) => {

    const handleRemoveClick = (event) => {
        console.log(event);
        event.stopPropagation();
        onRemoveClick()
    }
    return (
        <div className="OpeningItem">
            <Link className="LinkBoard" to={link}>
                {children}
            </Link>
            <span>{name}</span>
            <button onClick={handleRemoveClick}><i className="fas fa-trash"></i></button>
        </div>
    );
};

export default OpeningItem;