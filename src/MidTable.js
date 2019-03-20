import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import Platform from './Platform.js';
import MidPlatform from './MidPlatform.js';
import './MidTable.css';
const pickRandom = require('pick-random');
const EqualArray = require('equal-array').default;
const eq = new EqualArray();

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
            allPiecesTaken: false,
            first: true,
        }

        this.addPieces = this.addPieces.bind(this);
        this.moveToMiddle = this.moveToMiddle.bind(this);
        this.checkIfMidEmpty = this.checkIfMidEmpty.bind(this);
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

    checkIfMidEmpty() {
        if (eq(this.state.platformMidTiles) === eq([]) && eq(this.state.platformTiles.filter(item => eq(item) !== eq([null, null, null, null]))) === eq([])) {
            this.setState({allPiecesTaken: true});
        }
        else {
            this.setState({allPiecesTaken: false});
        }
    }

    async moveToMiddle(event, tileNumber) {
        const {changeMid, chooseMid, changeCurrentPieces} = this.props;
        
        if (chooseMid) {
            let pieceColor = event.target.getAttribute("type");
            let chosen = this.state.platformTiles[tileNumber].filter(item => item === pieceColor);
            let notChosen = this.state.platformTiles[tileNumber].filter(item => item !== pieceColor);
            await this.setState(state => {
                        let arr = [];
                        Array.prototype.push.apply(arr, state.platformMidTiles);
                        Array.prototype.push.apply(arr, notChosen);
                        return {platformMidTiles: arr};
                    });
            await this.setState((state) => {
                const list = state.platformTiles.map((item, j) => {
                    if (tileNumber === j)
                        return [null, null, null, null];
                    else
                        return item;
                });
                return {platformTiles: list,};
            });
            
            this.checkIfMidEmpty();
            changeMid(false);
            changeCurrentPieces(chosen);


        }

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

    async takeFromMiddle(event) {
        
        const {changeMid, chooseMid, changeCurrentPieces, firstTaken, playerTurn} = this.props;
        
        if (chooseMid) {
            let pieceColor = event.target.getAttribute("type");
            let chosen = this.state.platformMidTiles.filter(item => item === pieceColor);
            await this.setState(state => {
                        let notChosen = this.state.platformMidTiles.filter(item => item !== pieceColor);
                        return {platformMidTiles: notChosen};
                    });

            if (this.state.first) {
                await this.setState({first: false});
                firstTaken(playerTurn);
            };

            this.checkIfMidEmpty();
            changeMid(false);
            changeCurrentPieces(chosen);
        }
    }



    render() {
        return(
        [
            <Platform onClick={(e) => this.moveToMiddle(e, 0)} pieces={this.state.platformTiles[0]} style={{position: "absolute", top: "15%", left: "30%"}}/>,
            <Platform onClick={(e) => this.moveToMiddle(e, 1)} pieces={this.state.platformTiles[1]} style={{position: "absolute", top: "35%", left: "10%"}}/>,
            <Platform onClick={(e) => this.moveToMiddle(e, 2)} pieces={this.state.platformTiles[2]} style={{position: "absolute", top: "55%", left: "10%"}}/>,
            <Platform onClick={(e) => this.moveToMiddle(e, 3)} pieces={this.state.platformTiles[3]} style={{position: "absolute", top: "75%", left: "20%"}}/>,
            <Platform onClick={(e) => this.moveToMiddle(e, 4)} pieces={this.state.platformTiles[4]} style={{position: "absolute", top: "75%", left: "40%"}}/>,
            <Platform onClick={(e) => this.moveToMiddle(e, 5)} pieces={this.state.platformTiles[5]} style={{position: "absolute", top: "75%", left: "60%"}}/>,
            <Platform onClick={(e) => this.moveToMiddle(e, 6)} pieces={this.state.platformTiles[6]} style={{position: "absolute", top: "55%", left: "70%"}}/>,
            <Platform onClick={(e) => this.moveToMiddle(e, 7)} pieces={this.state.platformTiles[7]} style={{position: "absolute", top: "35%", left: "70%"}}/>,
            <Platform onClick={(e) => this.moveToMiddle(e, 8)} pieces={this.state.platformTiles[8]} style={{position: "absolute", top: "15%", left: "50%"}}/>,
            <MidPlatform onClick={(e) => this.takeFromMiddle(e)} pieces={this.state.platformMidTiles.sort()} style={{position: "absolute", top: "35%", left: "30%"}}/>,
            this.state.first ? <table><td className="number-one">1</td></table> : null,
        ]
        );
    }
}

export default MidTable;