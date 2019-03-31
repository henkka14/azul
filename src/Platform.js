import React, { Component } from 'react';
import Piece from './Piece.js';
import './Platform.css';

const PIECE_SIZE = "1.5vw";

class Platform extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {pieces, onClick} = this.props;
        return(
            <table onClick={onClick} className="platform-table" style={this.props.style}>
                <tr className="platform-row">
                    <Piece size={PIECE_SIZE}  pieceType={pieces[0]}/>
                    <Piece size={PIECE_SIZE}  pieceType={pieces[1]}/>
                </tr>
                <tr className="platform-row">
                    <Piece size={PIECE_SIZE}  pieceType={pieces[2]}/>
                    <Piece size={PIECE_SIZE}  pieceType={pieces[3]}/>
                </tr>
            </table>
        );
    }

}

export default Platform;