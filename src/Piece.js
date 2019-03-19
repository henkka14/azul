import React, { Component } from 'react';
import './Piece.css';

const TYPES = {
    royalblue: "roaylblue",
    yellow: "yellow",
    red: "red",
    black: "black",
    aqua: "aqua",
}

const Piece = (props) => {
        const {pieceType} = props;
        return(
        <td type={pieceType} className="piece-common" style={{backgroundColor: pieceType}}></td>
        );
    }


export default Piece;