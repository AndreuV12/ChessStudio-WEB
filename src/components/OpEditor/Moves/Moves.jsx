import React from 'react';
import './Moves.css';

const Moves = ({moves, onMoveClick}) => {
    const handleMoveClick = (move) => {
        onMoveClick(move)
    }
    return (
        <div className='Moves'>
            <p> Moves </p>
            <ol>
                {moves && Object.keys(moves).map((move)=>(
                    <li onClick={()=> handleMoveClick(move)}>{move}</li>
                ))}
            </ol>
        </div>
    );
};

export default Moves;