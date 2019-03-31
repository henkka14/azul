import React, {Component } from 'react';
import Platform from './Platform.js';
import MidPlatform from './MidPlatform.js';
import Piece from './Piece.js';

const pickRandom = require('pick-random');
const EqualArray = require('equal-array').default;
const eq = new EqualArray();

const TYPES = [
    "blue",
    "yellow",
    "red",
    "black",
    "aqua",
];

const BAG_TYPES = [
    "bagBlue",
    "bagYellow",
    "bagRed",
    "bagBlack",
    "bagAqua",
];

const PIECE_SIZE = "1.5vw";

class MidTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blue: 20,
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
        this.refillPieces = this.refillPieces.bind(this);
        this.getPieces = this.getPieces.bind(this);
    }


    addPieces(tileNumber) {
        const {bagBlue, bagYellow, bagRed, bagBlack, bagAqua, changeBagPieces} = this.props;
        let pieces = Array(4).fill(null);
        let bagPieces = {
                         'bagBlue': bagBlue,
                         'bagYellow': bagYellow,
                         'bagRed': bagRed,
                         'bagBlack': bagBlack,
                         'bagAqua': bagAqua,
                     };

        for (let i = 0; i < pieces.length; i++) {
            let filteredTypes = TYPES.filter(type => this.state[type] > 0);

            if (filteredTypes.length > 0) {
                let randomType = pickRandom(filteredTypes)[0];
                pieces[i] = randomType;

                this.setState((prevState) => { return {[randomType] : prevState[randomType] - 1}});
            }
            else {
                let filteredBagTypes = BAG_TYPES.filter(type => bagPieces[type] > 0);
                if (filteredBagTypes.length > 0) {
                    let mapBagTypes = {
                            'bagBlue': 'blue',
                            'bagYellow': 'yellow',
                            'bagRed': 'red',
                            'bagBlack': 'black',
                            'bagAqua': 'aqua',
                        };

                    let randomType = pickRandom(filteredBagTypes)[0];
                    pieces[i] = mapBagTypes[randomType];

                    bagPieces[randomType] -= 1;
                }
            }
        }

        changeBagPieces(bagPieces);

        this.setState((state) => {
            const list = state.platformTiles.map((item, j) => {
                if (tileNumber === j)
                    return pieces;
                else
                    return item;
            });
            return {platformTiles: list,};
        });
        
        return pieces;
    }

    getPieces() {
        return {"blue": this.state.blue,
                "yellow": this.state.yellow,
                "red": this.state.red,
                "black": this.state.black,
                "aqua": this.state.aqua,
            };
    }

    async checkIfMidEmpty() {
        const {changeScoringTime} = this.props;
        if (eq(this.state.platformMidTiles) === eq([]) && eq(this.state.platformTiles.filter(item => eq(item) !== eq([null, null, null, null]))) === eq([])) {
            await this.setState({allPiecesTaken: true, first: true});
            changeScoringTime(true);
        }
        else {
            this.setState({allPiecesTaken: false});
        }
    }

    async refillPieces() {
        await this.addPieces(0);
        await this.addPieces(1);
        await this.addPieces(2);
        await this.addPieces(3);
        await this.addPieces(4);
        await this.addPieces(5);
        await this.addPieces(6);
        await this.addPieces(7);
        await this.addPieces(8);
    }

    async moveToMiddle(event, tileNumber) {
        const {changeMid, chooseMid, changeCurrentPieces, scoringTime} = this.props;
        const platformNotEmpty = this.state.platformTiles[tileNumber].filter(item => item === null).length !== 4;
        if (chooseMid && platformNotEmpty) {
            let pieceColor = event.target.getAttribute("type");
            let chosen = this.state.platformTiles[tileNumber].filter(item => item === pieceColor);
            let notChosen = this.state.platformTiles[tileNumber].filter(item => item !== pieceColor);
            if (chosen.length > 0) {
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
            if (chosen.length > 0) {
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
    }


    render() {
        const {finalRound} = this.props;
        return(
        [
            <Platform onClick={(e) => finalRound ? null :this.moveToMiddle(e, 0)} pieces={this.state.platformTiles[0]} style={{position: "absolute", top: "15%", left: "30%"}}/>,
            <Platform onClick={(e) => finalRound ? null :this.moveToMiddle(e, 1)} pieces={this.state.platformTiles[1]} style={{position: "absolute", top: "35%", left: "10%"}}/>,
            <Platform onClick={(e) => finalRound ? null :this.moveToMiddle(e, 2)} pieces={this.state.platformTiles[2]} style={{position: "absolute", top: "55%", left: "10%"}}/>,
            <Platform onClick={(e) => finalRound ? null :this.moveToMiddle(e, 3)} pieces={this.state.platformTiles[3]} style={{position: "absolute", top: "75%", left: "20%"}}/>,
            <Platform onClick={(e) => finalRound ? null :this.moveToMiddle(e, 4)} pieces={this.state.platformTiles[4]} style={{position: "absolute", top: "75%", left: "40%"}}/>,
            <Platform onClick={(e) => finalRound ? null :this.moveToMiddle(e, 5)} pieces={this.state.platformTiles[5]} style={{position: "absolute", top: "75%", left: "60%"}}/>,
            <Platform onClick={(e) => finalRound ? null :this.moveToMiddle(e, 6)} pieces={this.state.platformTiles[6]} style={{position: "absolute", top: "55%", left: "70%"}}/>,
            <Platform onClick={(e) => finalRound ? null :this.moveToMiddle(e, 7)} pieces={this.state.platformTiles[7]} style={{position: "absolute", top: "35%", left: "70%"}}/>,
            <Platform onClick={(e) => finalRound ? null :this.moveToMiddle(e, 8)} pieces={this.state.platformTiles[8]} style={{position: "absolute", top: "15%", left: "50%"}}/>,
            <MidPlatform onClick={(e) => finalRound ? null : this.takeFromMiddle(e)} pieces={this.state.platformMidTiles.sort()} style={{position: "absolute", top: "35%", left: "30%"}}/>,
            this.state.first ? <table style={{tableLayout: "fixed", borderCollapse:"collapse", position: "absolute", top: "35%", left: "25%"}}><tr style={{lineHeight:"0px"}}><Piece pieceType="numberOne" size={PIECE_SIZE}/></tr></table> : null,
        ]
        );
    }
}

export default MidTable;