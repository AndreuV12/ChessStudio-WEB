import React from 'react';
import './Dialog.css';

const Dialog = ({ className, isOpen, onClose,title, body, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className={`dialog ${className}`} onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>{title}</h2>
          
        </div>
        <div className="dialog-body">
          {body}
        </div>
        <div className="dialog-actions">
          <button className="close-button" onClick={onClose}>Cancelar</button>
          {actions}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
