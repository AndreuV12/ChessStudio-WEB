import React, { useState, useEffect } from 'react';
import Dialog from '../../../Common/Dialog/Dialog';
import TextField from '../../../Common/TextField/TextField';
import './EditNameDialog.css';

const EditNameDialog = ({dialog, previousName, onClose, onSubmitChange}) => {
    const [newName, setNewName] = useState("")
    
    useEffect(() => {
        // Limpiar el campo de entrada cuando se cierra el diálogo
        if (!dialog) {
            setNewName("");
        }
    }, [dialog]);

    return (
        <Dialog 
            className="Dialog"
            isOpen={dialog}
            onClose={onClose}
            title="Cambiar nombre"
            body={
                <>
                <TextField
                    label="Nombre actual"
                    value={previousName}
                    disabled
                >
                </TextField>
                <TextField 
                    label="Nuevo Nombre"
                    value={newName}
                    onChange={(event)=>setNewName(event.target.value)}
                ></TextField>
                </>
                
            }
            actions={
                <button onClick={()=>onSubmitChange(newName)}>Cambiar</button>
            }
        >
        </Dialog>
    );
};

export default EditNameDialog;