import React from "react"
import "./Square.css"

export default function Square({piece, coor, selected, lastMoved}) {

    const getImageSrc = (piece) => {
        if (!piece) return
        return (piece === piece.toUpperCase()) ?
            `src/assets/pieces/white-${piece}.png`:
            `src/assets/pieces/black-${piece.toUpperCase()}.png`
    }

    if (!piece) return (
        <div 
            className={`Square${selected ? ' Selected' : ''}${lastMoved ? ' LastMoved' : ''}`}
            draggable="false"
            coor={coor}
        />
    )

    return (
        <img 
            className={`Square${selected ? ' Selected' : ''}${lastMoved ? ' LastMoved' : ''}`}
            alt="piece"
            src={getImageSrc(piece)}
            draggable="false"
            coor={coor}
        />
    )
}