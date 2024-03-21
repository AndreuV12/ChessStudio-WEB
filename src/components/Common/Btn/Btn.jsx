import React from 'react';
import './Btn.css';

const Btn = ({children, className, loading=false, onClick}) => {
    return (
        <button 
            className={`Btn ${className}`}
            onClick={onClick}    
        >
            {loading ? (
                <div className="spinner" ></div>
            ) : (
                children
            )                
            }
            
        </button>
    );
};

export default Btn;