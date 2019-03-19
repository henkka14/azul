import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import Platform from './Platform.js';
import MidPlatform from './MidPlatform.js';
const pickRandom = require('pick-random');

const TYPES = [
    "royalblue",
    "yellow",
    "red",
    "black",
    "aqua",
]

class MidTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            royalblue: 20,
            yellow: 20,
            red: 20,
            black: 20,
            aqua: 20,
            platformCount: 9,
            platformTiles: Array(9).fill(() => Array(4).fill(null)),
            platformMidTiles: [],
            plat0: true,
            plat1: true,
            plat2: true,
            plat3: true,
            plat4: true,
            plat5: true,
            plat6: true,
            plat7: true,
            plat8: true,
        }

        this.addPieces = this.addPieces.bind(this);
        this.moveToMiddle = this.moveToMiddle.bind(this);
    }


    addPieces(tileNumber) {
        let pieces = Array(4).fill(null);
        let tileList = [];

        for (let i = 0; i < pieces.length; i++) {
            let filteredTypes = TYPES.filter(type => this.state[type] > 0);

            if (filteredTypes.length > 0) {
                let randomType = pickRandom(filteredTypes)[0];
                pieces[i] = randomType;
                tileList.push(randomType);

                this.setState((prevState) => { return {[randomType] : prevState[randomType] - 1}});
            }
        }

        this.setState((state) => {
            const list = state.platformTiles.map((item, j) => {
                if (tileNumber === j)
                    return tileList;
                else
                    return item;
            });
            return {platformTiles: list,};
        });
        
        return pieces;
    }

    moveToMiddle(event, tileNumber) {
        let pieceColor = event.target.getAttribute("type");
        let notChosen = this.state.platformTiles[tileNumber].filter(item => item !== pieceColor);
        this.setState(state => {
                    let arr = [];
                    Array.prototype.push.apply(arr, state.platformMidTiles);
                    Array.prototype.push.apply(arr, notChosen);
                    return {platformMidTiles: arr};
                });
        this.setState({["plat" + tileNumber]: false})

    }

    componentDidMount() {
        this.addPieces(0);
        this.addPieces(1);
        this.addPieces(2);
        this.addPieces(3);
        this.addPieces(4);
        this.addPieces(5);
        this.addPieces(6);
        this.addPieces(7);
        this.addPieces(8);
    }

    render() {
        return(
        [
            this.state.plat0 && <Platform onClick={(e) => this.moveToMiddle(e, 0)} pieces={this.state.platformTiles[0]} style={{position: "absolute", top: "15%", left: "30%"}}/>,
            this.state.plat1 && <Platform onClick={(e) => this.moveToMiddle(e, 1)} pieces={this.state.platformTiles[1]} style={{position: "absolute", top: "35%", left: "10%"}}/>,
            this.state.plat2 && <Platform onClick={(e) => this.moveToMiddle(e, 2)} pieces={this.state.platformTiles[2]} style={{position: "absolute", top: "55%", left: "10%"}}/>,
            this.state.plat3 && <Platform onClick={(e) => this.moveToMiddle(e, 3)} pieces={this.state.platformTiles[3]} style={{position: "absolute", top: "75%", left: "20%"}}/>,
            this.state.plat4 && <Platform onClick={(e) => this.moveToMiddle(e, 4)} pieces={this.state.platformTiles[4]} style={{position: "absolute", top: "75%", left: "40%"}}/>,
            this.state.plat5 && <Platform onClick={(e) => this.moveToMiddle(e, 5)} pieces={this.state.platformTiles[5]} style={{position: "absolute", top: "75%", left: "60%"}}/>,
            this.state.plat6 && <Platform onClick={(e) => this.moveToMiddle(e, 6)} pieces={this.state.platformTiles[6]} style={{position: "absolute", top: "55%", left: "70%"}}/>,
            this.state.plat7 && <Platform onClick={(e) => this.moveToMiddle(e, 7)} pieces={this.state.platformTiles[7]} style={{position: "absolute", top: "35%", left: "70%"}}/>,
            this.state.plat8 && <Platform onClick={(e) => this.moveToMiddle(e, 8)} pieces={this.state.platformTiles[8]} style={{position: "absolute", top: "15%", left: "50%"}}/>,
            <MidPlatform pieces={this.state.platformMidTiles} style={{position: "absolute", top: "35%", left: "30%"}}/>,
        ]
        );
    }
}

export default MidTable;