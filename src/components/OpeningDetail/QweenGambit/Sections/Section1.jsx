import React, { useState } from 'react';
import Board from '../../../Board/Board';
import { QweenGambitOpening } from '../../../../utils/Openings';
const QweenGambit = () => {
    const secuence = QweenGambitOpening.section1;
    const [move, setMove] = useState(0)

    const handleNext = () => {
        if (move<secuence.length-1) setMove(move+1)
    }

    const handlePrev = () => {
        if (move>0) setMove(move-1)
    }
    return (
        <div className='OpeningDetail'>
            <h2>Posición Inicial</h2>
            <p>Gambito de dama, además del nombre de una serie, es una apertura de ajedrez que se encuentra clasificada dentro de las aperturas cerradas y consiste en <span onClick={()=>{setMove(1)}}>jugar el peón de dama</span> para controlar las casillas c5 y e5. Posterior a <span onClick={()=>{setMove(1)}}>d4</span>, las negras juegan <span onClick={()=>{setMove(2)}}>d5</span> y las blancas responde <span onClick={()=>{setMove(3)}}>c4</span> sacrificando un peón para tener ventaja en el ataque y el desarrollo.</p>
            <Board pos={secuence[move]}>
            </Board>
            <div className='NavigationButtons'>
                <button onClick={handlePrev}>
                    <i className='fa-solid fa-caret-left'></i>
                </button>
                <button onClick={handleNext}>
                    <i className='fa-solid fa-caret-right'></i>
                </button>
            </div>
        </div>
    );
};

export default QweenGambit;