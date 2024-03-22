import React from 'react';
import './SettingsBar.css';

const SettingsBar = ({onPrevClick, onNextClick, onRotateClick}) => {
    return (
        <div className='SettingsBar'>
            <button onClick={onRotateClick}><i className="fa-solid fa-rotate"></i></button>
            <button onClick={onPrevClick}><i className="fa-solid fa-caret-left"></i></button>
            <button onClick={onNextClick}><i className="fa-solid fa-caret-right"></i></button>
        </div>
    );
};

export default SettingsBar;