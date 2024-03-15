import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OpeningList.css';
import OpeningItem from './OpeningItem/OpeningItem';
import Board from '../Board/Board';

import axios from "axios"
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
import { SERVER_URL } from '../../config/config'

const OpeningList = () => {
    const navigate = useNavigate()
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
        <div className='OpeningList'>
            <div className='Toolbar'>
                <p>Filter</p>
                <button onClick={ ()=>{ navigate('/openings/new')}}><i className="fas fa-plus"></i></button>
            </div>
            { OpeningList.map((opening)=>(
                <OpeningItem key={opening._id} name={opening.name} link={`openings/${opening._id}`}>
                    <Board pos={opening.shown_pos}></Board>
                </OpeningItem>  
            ))}
        </div>       
    );
};

export default OpeningList;