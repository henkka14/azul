import React, { Component } from 'react';
import Piece from './Piece.js';



class Platform extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {pieces, onClick} = this.props;
        return(
            <table onClick={onClick} style={this.props.style}>
                <tr>
                    <Piece pieceType={pieces[0]}/>
                    <Piece pieceType={pieces[1]}/>
                </tr>
                <tr>
                    <Piece pieceType={pieces[2]}/>
                    <Piece pieceType={pieces[3]}/>
                </tr>
            </table>
        );
    }

}

export default Platform;