import React, { Component } from 'react';
import './Piece.css';
import blue from './img/blue.JPG';
import black from './img/black.JPG';
import aqua from './img/aqua.JPG';
import red from './img/red.JPG';
import yellow from './img/yellow.JPG';
import numberOne from './img/numberOne.JPG';
import emptyTile from './img/emptyTile.jpg';

const TYPES = {
    blue: blue,
    yellow: yellow,
    red: red,
    black: black,
    aqua: aqua,
    numberOne: numberOne,
    emptyTile: emptyTile,
}

const Piece = (props) => {
        const {pieceType, opacity, size} = props;
        return(
        <td className="piece-common" style={{width: size, height: size}}>
        <img src={TYPES[pieceType]} alt="" className="img-style" style={{opacity: opacity}} type={pieceType}></img>
        </td>
        );
    }


export default Piece;