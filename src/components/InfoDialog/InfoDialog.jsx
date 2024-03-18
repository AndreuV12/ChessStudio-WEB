import React, { useState, useEffect } from 'react';
import './InfoDialog.css';

const InfoDialog = ({ dialog, msg }) => {
  const [mostrarDialogo, setMostrarDialogo] = useState(true);
  return (
    <div>
      {dialog && (
        <div className="info-dialog">
          <p>{msg}</p>
        </div>
      )}
    </div>
  );
};

export default InfoDialog;
