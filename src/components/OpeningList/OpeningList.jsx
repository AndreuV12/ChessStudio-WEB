import React from 'react';
import './OpeningList.css';
import OpeningItem from './OpeningItem/OpeningItem';
import Board from '../Board/Board';
import { INITIAL_POS, QG_POS, ITALIAN, FRENCH_DEFENSE } from '../../utils/Constants';

const OpeningList = () => {
    return (
        <div className='OpeningListPage'>
            <h1>Openings</h1>
            <p> Click an <strong>opening</strong> to study <i className="fa-solid fa-hand-pointer"></i></p>
            <div className='OpeningList'>
                <OpeningItem name="Qween Gambit" link="openings/qween-gambit">
                    <Board pos={QG_POS}></Board>
                </OpeningItem>
                <OpeningItem name="Qween Gambit" link="openings/qween-gambit">
                    <Board pos={QG_POS}></Board>
                </OpeningItem>

            </div>
        </div>
        
    );
};

export default OpeningList;