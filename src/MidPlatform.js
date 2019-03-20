import React, { Component } from 'react';
import Piece from './Piece.js';

class MidPlatform extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {pieces, onClick} = this.props;
        return(
            <table style={this.props.style} onClick={onClick}>
                <tr>
                    {pieces.map((item, j) => item && j < 5 ? <Piece pieceType={item} /> : null)}
                </tr>
                <tr>
                    {pieces.map((item, j) => item && j < 10 && j >= 5 ? <Piece pieceType={item} /> : null)}
                </tr>
                <tr>
                    {pieces.map((item, j) => item && j < 15 && j >= 10 ? <Piece pieceType={item} /> : null)}
                </tr>
                <tr>
                    {pieces.map((item, j) => item && j > 15 && j <= 20 ? <Piece pieceType={item} /> : null)}
                </tr>
                <tr>
                    {pieces.map((item, j) => item && j >= 20 && j < 25 ? <Piece pieceType={item} /> : null)}
                </tr>
            </table>
        );

    }


}

export default MidPlatform;