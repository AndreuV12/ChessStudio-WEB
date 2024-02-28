import React from "react"
import "./Square.css"

import whiteKing from "../../../assets/pieces/white-K.png";
import blackKing from "../../../assets/pieces/black-K.png";
import whiteQueen from "../../../assets/pieces/white-Q.png";
import blackQueen from "../../../assets/pieces/black-Q.png";
import whiteRook from "../../../assets/pieces/white-R.png";
import blackRook from "../../../assets/pieces/black-R.png";
import whiteBishop from "../../../assets/pieces/white-B.png";
import blackBishop from "../../../assets/pieces/black-B.png";
import whiteKnight from "../../../assets/pieces/white-N.png";
import blackKnight from "../../../assets/pieces/black-N.png";
import whitePawn from "../../../assets/pieces/white-P.png";
import blackPawn from "../../../assets/pieces/black-P.png";

export default function Square({piece, coor, selected, lastMoved}) {

    const pieceImages = {
        K: whiteKing,
        k: blackKing,
        Q: whiteQueen,
        q: blackQueen,
        R: whiteRook,
        r: blackRook,
        B: whiteBishop,
        b: blackBishop,
        N: whiteKnight,
        n: blackKnight,
        P: whitePawn,
        p: blackPawn,
    };

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
            src={pieceImages[piece] || null}
            draggable="false"
            coor={coor}
        />
    )
}