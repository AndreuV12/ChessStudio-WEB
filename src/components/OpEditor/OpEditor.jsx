import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OpEditor.css';
import Board from '../Board/Board';
import SettingsBar from './SettingsBar/SettingsBar';
import Moves from './Moves/Moves';
import axios from "axios"
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
import { SERVER_URL } from '../../config/config'

import { getOpeningData, addMoveToOpening, getMoveName } from '../../utils/ChessUtils';

const OpEditor = () => {
    const [opening, setOpening] = useState({});
    const [path, setPath] = useState([])
    const [selectedSquare, setSelectedSquare] = useState(null)
    const { config, moves, lastMove} = getOpeningData(opening, path) // Se recalculara cada vez que se renderize el componente
    // Lo demas va en funcion e opening y path
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        getOpening()
    },[])

    const getOpening = async () => {
        axios.get(`${SERVER_URL}openings/${id}`)
        .then((response)=> {
            console.log("FETCH OPENING", response.data);
            setOpening(response.data)
        })
        .catch((err)=>{
          console.log(err)
        })
    }

    const updateOpening = async (opening) => {
        axios.put(`${SERVER_URL}openings/${id}`, opening)
        .then((response)=> {
            console.log("Update OPENING", response.data);
        })
        .catch((err)=>{
            console.log(err)
        })
    }

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
        console.log("handleMove");
        // Mirar si el movimiento esta registrado en Opening
        const moveName = getMoveName(move, config) // TODO Funcion para sacar nombre
        if (moveName in moves){
            setSelectedSquare(null)
            setPath([...path, moveName])
            
        }
        else {            
            const updatedOp = addMoveToOpening(opening, path, move, moveName)
            updateOpening({data: updatedOp.data}) // Solo pasamos la data porque no hay que modificar todo el opening
            setOpening(updatedOp)
            setPath([...path, moveName])
            setSelectedSquare(null)
        }
    };

    const handleMoveClick = (move) => {
        console.log(move);
        setPath([...path, move])
    }

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
        <div className='OpEditor'>
            <h1>{opening.name}</h1>
            <button onClick={()=>{navigate('/')}} className="Back">
                <i className="fa-solid fa-left-long"></i>
            </button>
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
            <Moves moves={moves} onMoveClick={handleMoveClick}></Moves>
            <div className='Notation'><p> Notation: Path Path Path</p></div>

        </div>
    );
};

export default OpEditor;