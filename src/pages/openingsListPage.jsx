import React from 'react';
import OpeningList from '../components/OpeningList/OpeningList';

const OpeningListPage = () => {
    return (
        <div className='Page openingListPage'>
            <h1>Openings</h1>
            <OpeningList/>
        </div>
        
    );
};

export default OpeningListPage;