import React, { useState } from 'react';
import './OpeningItem.css';
import Board from '../../Board/Board';
import Menu from '../../Common/Menu/Menu';
import EditNameDialog from './EditNameDialog/EditNameDialog';
import { Link } from 'react-router-dom';
import axios from "axios"
import { SERVER_URL } from '../../../config/config';
const OpeningItem = ({opening, onChange}) => {
    console.log(opening);
    const [dialog, setDialog] = useState(false)
    const deleteOpening = () => {
        axios.delete(`${SERVER_URL}openings/${opening._id}`)
        .then(()=> {
            onChange()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const changeName = (name) => {
        axios.put(`${SERVER_URL}openings/${opening._id}`, {
            name
        })
        .then(()=> {
            onChange()
        })
        .catch((err)=>{
          console.log(err)
        })
    }
    return (
        <>
        <Link className="OpeningItem" to={`openings/${opening._id}`}>
            <Board pos={opening.shown_pos}></Board>
            <span>{opening.name}</span>

            <Menu
                className="OptionsMenu"
                label={<i className="fa-solid fa-gear"></i>} 
            >
                <button 
                    className="ChangeName"
                    onClick={()=>{setDialog(true)}}    
                >
                    <i className="fa-solid fa-pen-to-square"></i> Change Name
                </button>
                <button 
                    className="Delete"
                    onClick={deleteOpening}
                >
                    <i className="fa-solid fa-trash"></i> Delete
                </button>
            </Menu>
            
        </Link>
        <EditNameDialog
            dialog={dialog}
            previousName={opening.name}
            onClose={()=>{setDialog(false)}}
            onSubmitChange={(name) => {
                setDialog(false)
                changeName(name)
            }}
        
        ></EditNameDialog>
        </>
    );
};

export default OpeningItem;