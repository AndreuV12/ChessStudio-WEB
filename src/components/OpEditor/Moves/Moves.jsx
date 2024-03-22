import './Moves.css';
import React from 'react';

import Btn from "../../Common/Btn/Btn"
const Moves = ({moves, onMoveClick, onMoveDelete}) => {

    return (
        <ol className='Moves'>
            {moves && Object.keys(moves).map((move)=>(
                <li onClick={()=> onMoveClick(move)}>
                    <span className='MoveName'>{move}</span>
                    <div className='MoveActions' onClick={(e)=>{e.stopPropagation()}}>
                        <Btn onClick={()=>onMoveDelete(move)} className='DeleteBtn'>
                            <i className="fa-solid fa-trash"></i> 
                        </Btn>
                    </div>
                </li>
            ))}
        </ol>
    );
};

export default Moves;