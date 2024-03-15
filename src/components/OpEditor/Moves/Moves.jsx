import React from 'react';
import './Moves.css';

const Moves = ({moves, onMoveClick}) => {
    const handleMoveClick = (move) => {
        onMoveClick(move)
    }
    return (
        <ol className='Moves'>
            {moves && Object.keys(moves).map((move)=>(
                <li onClick={()=> handleMoveClick(move)}>
                    <span></span>
                    <span>{move}</span>
                    <div>Actions</div>
                
                </li>
            ))}
        </ol>
    );
};

export default Moves;