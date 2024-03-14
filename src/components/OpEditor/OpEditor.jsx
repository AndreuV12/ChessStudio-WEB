import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './OpEditor.css';
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'
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
            setPath([...path, JSON.stringify(move)])
            
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

    console.log(lastMove);
    return (
        <div className='OpEditor'>
            <h1> {opening.name}</h1>
            <Board 
                pos={config ? config.pieces : {}}
                selectedPiece={selectedSquare}
                lastMove={lastMove}
                onSquareClick={handleSquareClick}
            >

            </Board>
            <SettingsBar onPrevClick={handlePrevClick} onNextClick={handleNextClick}></SettingsBar>
            {/* <h2>Path</h2>
            <p>{JSON.stringify(path)}</p>
            <h2>Moves</h2> */}
            <Moves moves={moves} onMoveClick={handleMoveClick}></Moves>

        </div>
    );
};

export default OpEditor;