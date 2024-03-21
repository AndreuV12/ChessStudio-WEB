import './OpeningList.css';
import axios from "axios"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllContexts } from '../../hooks/Context';
import { SERVER_URL } from '../../config/config'

import OpeningItem from './OpeningItem/OpeningItem';

const OpeningList = () => {
    const navigate = useNavigate()
    const [OpeningList, setOpeningList] = useState([])
    const { user } = useAllContexts()
    
    useEffect(() => {
        if (!user){ 
            setOpeningList([])
        } 
        else {
            getOpenings();
        }
    }, [user])

    const getOpenings = async () => {
        axios.get(`${SERVER_URL}openings`)
        .then((response)=> {
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