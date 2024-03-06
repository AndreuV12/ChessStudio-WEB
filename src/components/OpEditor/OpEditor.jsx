import React, { useEffect, useState } from 'react';
import './OpEditor.css';
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'
import { OpListExample } from '../../utils/OpList';

import Board from '../Board/Board';
import { INITIAL_POS } from '../../utils/Constants';


const OpEditor = ({opening = OpListExample[0]}) => {
    const [game] = useState(new Game()); // Usar estado para el juego
    const [config, setConfig] = useState(game.exportJson());
    const [bestMove, setBestMove] = useState("Calculando")
    const [selectedSquare, setSelectedSquare] = useState()
    const [lastMove, setLastMove] = useState()
    // useEffect(() => {
    //     const computeBestMove = async () => {
    //         await new Promise(resolve => setTimeout(resolve, 0)); // Espera al próximo ciclo de renderizado
    //         setBestMove(Object.entries( await aiMove(config, 3) )[0].join(' '))
    //     };
    //     computeBestMove();
    // }, [config]); 

    const openingData = opening.data
    
    let pos= INITIAL_POS;
    
    console.log("OpEditor")
        
    const handleSquareClick = (coor) => {
        console.log(config);
        if (!selectedSquare) {
            if (Object.keys(config.moves).includes(coor)) {
                setSelectedSquare(coor);
            }
        } else {
            const move = { from: selectedSquare, to: coor };
            handleMove(move);
        }
    };
    
    const handleMove = (move) => {
        try {
            game.move(move.from, move.to);
            setSelectedSquare(null)
            setLastMove(move)
            setBestMove("Calculando");
            setConfig(game.exportJson());
        } catch (err) {    
            if (Object.keys(config.moves).includes(move.to)) {
                setSelectedSquare(move.to);
            }
            else
                setSelectedSquare(null)
        }
    };

    return (
        <div className='OpEditor'>
            <Board 
                pos={config ? config.pieces : INITIAL_POS}
                selectedPiece={selectedSquare}
                lastMove={lastMove}
                onSquareClick={handleSquareClick}
            >

            </Board>
            { }
            <p> Mejor movimiento {bestMove}</p>

        </div>
    );
};

export default OpEditor;