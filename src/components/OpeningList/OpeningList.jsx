import './OpeningList.css';
import axios from "axios"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllContexts } from '../../hooks/Context';
import { SERVER_URL } from '../../config/config'

import TextField from '../Common/TextField/TextField';
import OpeningItem from './OpeningItem/OpeningItem';

const OpeningList = () => {
    const navigate = useNavigate()
    const [OpeningList, setOpeningList] = useState([])
    const [filter, setFilter] = useState("")
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
    const filteredOpeningList = OpeningList

    return (
        <div className='OpeningList'>
            <div className='Toolbar'>
                <TextField label="Filter" value={filter} onChange={(event)=>setFilter(event.target.value)}></TextField>
                <button onClick={ ()=>{ navigate('/openings/new')}}><i className="fas fa-plus"></i></button>
            </div>
            {filteredOpeningList
                .filter(opening => opening.name.toLowerCase().includes(filter.toLowerCase()))
                .map(opening => (
                    <OpeningItem 
                        opening={opening}
                        onChange={getOpenings}
                        key={opening._id} 
                    />
                ))}
        </div>    
    );
};

export default OpeningList;