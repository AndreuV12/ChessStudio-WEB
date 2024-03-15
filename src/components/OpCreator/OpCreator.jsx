import React, { useState } from 'react';
import './OpCreator.css';
import Board from '../Board/Board';
import SettingsBar from '../OpEditor/SettingsBar/SettingsBar';
import TextField from '../TextField/TextField';

import { INITIAL_OP } from '../../utils/Constants';
import { getOpeningData, getMoveName, addMoveToOpening } from '../../utils/ChessUtils';
const OpCreator = () => {
    const [opening, setOpening] = useState(INITIAL_OP);
    const [path, setPath] = useState([])
    const [selectedSquare, setSelectedSquare] = useState(null)
    const { config, moves, lastMove} = getOpeningData(opening, path) // Se recalculara cada vez que se renderize el componente
    
    const [openingName, setOpeningName] = useState("")

    const handleNameChange = (event) => {
        setOpeningName(event.target.value);
    };
    const handleSquareClick = (coor) => {
        if (!selectedSquare) {
            if (coor in config.moves) {
                setSelectedSquare(coor)
            }
        } else if(config.moves[selectedSquare].includes(coor)){
            const move = { from: selectedSquare, to: coor };
            handleMove(move);
        }
        else if (coor in config.moves) {
            setSelectedSquare(coor)
        }
        else {
            setSelectedSquare(null)
        }
    };
    
    const handleMove = (move) => {
        // Mirar si el movimiento esta registrado en Opening
        const moveName = getMoveName(move, config) // TODO Funcion para sacar nombre
        if (moveName in moves){
            setSelectedSquare(null)
            setPath([...path, moveName])
            
        }
        else {            
            const updatedOp = addMoveToOpening(opening, path, move, moveName)
            setOpening(updatedOp)
            setPath([...path, moveName])
            setSelectedSquare(null)
        }
    };

    const handlePrevClick = () => {
        if (path.length) {
            setPath(path.slice(0,-1))
            setSelectedSquare(null)
        }
    }

    const handleNextClick = () => {
        const movesArray =  Object.keys(moves)
        if (movesArray.length) {
            setPath([...path,movesArray[0]])
            setSelectedSquare(null)
        }
    }

    return (
        <div className='OpCreator'>
            <TextField
                value={openingName}
                label="Opening Name"
                onChange={handleNameChange}
            >    
            </TextField>
            <div className='ShownPosPicker'>
                <label>Shown Pos</label>
                <div className='BoardWithTools'>
                    <Board 
                        pos={config ? config.pieces : {}}
                        selectedPiece={selectedSquare}
                        lastMove={lastMove}
                        onSquareClick={handleSquareClick}
                    >
                    </Board>
                    <SettingsBar onPrevClick={handlePrevClick} onNextClick={handleNextClick}></SettingsBar>
                </div>

            </div>

        </div>
    );
};

export default OpCreator;