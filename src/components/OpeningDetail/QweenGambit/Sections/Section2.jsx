import React, { useState } from 'react';
import Board from '../../../Board/Board';
import { QweenGambitOpening } from '../../../../utils/Openings';
const QweenGambit = () => {
    const secuence = QweenGambitOpening.section2;

    const [move, setMove] = useState(0)

    const handleNext = () => {
        if (move<secuence.length-1) setMove(move+1)
    }

    const handlePrev = () => {
        if (move>0) setMove(move-1)
    }
    return (
        <div className='OpeningDetail'>
            <h2>Gambito de dama aceptado</h2>
            <p>Si el negro acepta el sacrificio tiene que tener mucho cuidado. Se trata de un peón que se puede recuperar y esconde algunas trampas. Por ejemplo luego de <span onClick={()=>{setMove(0)}}>dxc4</span> el blanco puede jugar <span onClick={()=>{setMove(1)}}>e3</span>, amenazando recapturar el peón con el alfil. Si el negro se empeña en defenderlo puede cometer el error de jugar <span onClick={()=>{setMove(2)}}>b5</span>. A eso el blanco responde <span onClick={()=>{setMove(3)}}>a4</span>, y el negro se queda sin buenas jugadas para defender el peón. Por ejemplo si intenta <span onClick={()=>{setMove(4)}}>c3</span> el blanco podria capturar <span onClick={()=>{setMove(5)}}>axb5</span> y si el negro recaptura <span onClick={()=>{setMove(6)}}>cxb5</span> viene <span onClick={()=>{setMove(7)}}> Qf3</span> dejando el negro con grandes problemas para defender la torre.  </p>
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