import React, { useState, useEffect } from 'react';
import './OpeningList.css';
import OpeningItem from './OpeningItem/OpeningItem';
import Board from '../Board/Board';
import { INITIAL_POS, QG_POS, ITALIAN, FRENCH_DEFENSE } from '../../utils/Constants';

import axios from "axios"
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
import { SERVER_URL } from '../../config/config'

const OpeningList = () => {
    const [OpeningList, setOpeningList] = useState([])
    useEffect(() => {
        getOpenings();
      }, [])

    const getOpenings = async () => {
        axios.get(`${SERVER_URL}openings`)
        .then((response)=> {
         console.log(response);
         setOpeningList(response.data)
        })
        .catch((err)=>{
          console.log(err)
        })
    }

    return (
        <div className='OpeningListPage'>
            <h1>Openings</h1>
            <p> Click an <strong>opening</strong> to study <i className="fa-solid fa-hand-pointer"></i></p>
            <div className='OpeningList'>
                { OpeningList.map((opening)=>(
                    <OpeningItem key={opening._id} name={opening.name} link={`openings/${opening._id}`}>
                        <Board pos={opening.shown_pos}></Board>
                    </OpeningItem>  
                ))}
            </div>
        </div>
        
    );
};

export default OpeningList;