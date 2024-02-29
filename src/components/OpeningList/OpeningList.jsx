import React from 'react';
import './OpeningList.css';
import OpeningItem from './OpeningItem/OpeningItem';

import { INITIAL_POS, QG_POS, ITALIAN, FRENCH_DEFENSE } from '../../utils/Constants';

const OpeningList = () => {
    return (
        <div className='OpeningListPage'>
            <h1>Openings</h1>
            <p> Click an <strong>opening</strong> to study <i className="fa-solid fa-hand-pointer"></i></p>
            <div className='OpeningList'>
                <OpeningItem pos={QG_POS} name="Qween Gambit" link="openings/qween-gambit"></OpeningItem>
                <OpeningItem pos={ITALIAN} name="Italian Game"link="openings/italian-game"></OpeningItem>
                <OpeningItem pos={FRENCH_DEFENSE} name="French Defense" link="openings/french-defense"></OpeningItem>
            </div>
        </div>
        
    );
};

export default OpeningList;