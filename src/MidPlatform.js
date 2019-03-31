import React, { Component } from 'react';
import Piece from './Piece.js';
import './MidPlatform.css';

const PIECE_SIZE = "1.5vw";

class MidPlatform extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {pieces, onClick} = this.props;
        return(
            <table className="mid-platform" style={this.props.style} onClick={onClick}>
                <tr className="mid-platform-row">
                    {pieces.map((item, j) => j < 5 ? (item ? <Piece size={PIECE_SIZE}  pieceType={item} /> : <td className="piece-empty"></td>) : null)}
                </tr>
                <tr className="mid-platform-row">
                    {pieces.map((item, j) => j < 10 && j >= 5 ? (item ? <Piece size={PIECE_SIZE}  pieceType={item} /> : <td className="piece-empty"></td>) : null)}
                </tr>
                <tr className="mid-platform-row">
                    {pieces.map((item, j) => j < 15 && j >= 10 ? (item ? <Piece size={PIECE_SIZE}  pieceType={item} /> : <td className="piece-empty"></td>) : null)}
                </tr>
                <tr className="mid-platform-row">
                    {pieces.map((item, j) => j > 15 && j <= 20 ? (item ? <Piece size={PIECE_SIZE}  pieceType={item} /> : <td className="piece-empty"></td>) : null)}
                </tr>
                <tr className="mid-platform-row">
                    {pieces.map((item, j) => item && j >= 20 && j < 25 ? (item ? <Piece size={PIECE_SIZE}  pieceType={item} /> : <td className="piece-empty"></td>) : null)}
                </tr>
            </table>
        );

    }


}

export default MidPlatform;