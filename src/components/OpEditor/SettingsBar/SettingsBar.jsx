import React from 'react';
import './SettingsBar.css';

const SettingsBar = ({onPrevClick, onNextClick}) => {
    return (
        <div className='SettingsBar'>
            <button onClick={onPrevClick}><i class="fa-solid fa-rotate"></i></button>
            <button onClick={onPrevClick}><i class="fa-solid fa-caret-left"></i></button>
            <button onClick={onNextClick}><i class="fa-solid fa-caret-right"></i></button>
        </div>
    );
};

export default SettingsBar;