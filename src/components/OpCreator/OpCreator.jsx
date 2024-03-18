import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './OpCreator.css';
import Board from '../Board/Board';
import SettingsBar from '../OpEditor/SettingsBar/SettingsBar';
import TextField from '../TextField/TextField';
import InfoDialog from '../InfoDialog/InfoDialog';

import { SERVER_URL } from '../../config/config';
import { INITIAL_OP } from '../../utils/Constants';
import { getOpeningData, getMoveName, addMoveToOpening } from '../../utils/ChessUtils';
const OpCreator = () => {
    const [opening, setOpening] = useState(INITIAL_OP);
    const [path, setPath] = useState([])
    const [selectedSquare, setSelectedSquare] = useState(null)
    const { config, moves, lastMove} = getOpeningData(opening, path) // Se recalculara cada vez que se renderize el componente
    
    const [openingName, setOpeningName] = useState("")
    const [dialog, setDialog] = useState(false)
    const navigate = useNavigate()
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

    const createOpening = async () => {
        console.log("createOpening", openingName, config.pieces)
        setDialog(true)
        setTimeout(()=>{
            setDialog(false)
        }, 3000)

        // axios.post(`${SERVER_URL}openings/`, {
        //     name: openingName,
        //     shown_pos: config.pieces,
        //     data: opening.data,
        // })
        // .then((response)=> {
        //     console.log("Apertura creada con exito", response.data);
        //     navigate(`/openings/${response.data._id}`)
        //     // setOpening(response.data)
        // })
        // .catch((err)=>{
        //     // console.log(err)
        // })
        
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
                <label>{"Shown Pos"}</label>
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
            <button 
                className='CreateButton' 
                onClick={createOpening}
            >
                Create
            </button>
            <InfoDialog dialog={dialog} msg="Apertura Creada Con exito"></InfoDialog>

        </div>
    );
};

export default OpCreator;