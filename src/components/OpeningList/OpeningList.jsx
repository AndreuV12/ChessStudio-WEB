import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OpeningList.css';
import OpeningItem from './OpeningItem/OpeningItem';

import axios from "axios"
import { SERVER_URL } from '../../config/config'

const OpeningList = () => {
    const navigate = useNavigate()
    const [OpeningList, setOpeningList] = useState([])
    useEffect(() => {
        getOpenings();
    }, [])

    const getOpenings = async () => {
        console.log("getOpenings");
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
                <OpeningItem 
                    opening={opening}
                    onChange={getOpenings}
                    key={opening._id} 
                >
                </OpeningItem>  
            ))}
        </div>    
    );
};

export default OpeningList;