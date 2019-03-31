import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Board.css';
import Piece from './Piece.js';
import negOne from './img/negOne.jpg';
import negTwo from './img/negTwo.jpg';
import negThree from './img/negThree.jpg';


const MINUS_TILES = [
        1,
        1,
        2,
        2,
        2,
        3,
        3,
];

const TYPES = [
    "blue",
    "yellow",
    "red",
    "black",
    "aqua",
];

const PIECE_SIZE = "1vw";

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 20,
            height: 5,
            scoreTrack: 0,
            wall: new Array(5).fill().map(() => Array(5).fill(null)),
            floorRow: [],
            figureRow: Array(5).fill().map((item,i) => Array(i+1).fill(null)),
            tookFirst: false,
        };
        this.boardClicked = this.boardClicked.bind(this);
        this.floorClicked = this.floorClicked.bind(this);
        this.scoreFinalPoints = this.scoreFinalPoints.bind(this);
    }

    scoreFinalPoints() {
        let tokens = {'blue': 0,
                      'yellow': 0,
                      'red': 0,
                      'black': 0,
                      'aqua': 0,
                    };
        let finalPoints = 0;

        for (let row of this.state.wall) {
            for (let i=0; i < row.length; i++) {
                tokens[row[i]] += 1;
            }
            let fullRow = row.filter((item) => item !== null);
            if (fullRow.length === 5) finalPoints += 2;
        }

        for (let i = 0; i < 5; i++) {
            if (this.state.wall[0][i] !== null &&
                this.state.wall[1][i] !== null &&
                this.state.wall[2][i] !== null &&
                this.state.wall[3][i] !== null &&
                this.state.wall[4][i] !== null)
                finalPoints += 7;
        }

        if (tokens.blue === 5) {
            finalPoints += 10;
        }
        if (tokens.yellow === 5) {
            finalPoints += 10;
        }
        if (tokens.red === 5) {
            finalPoints += 10;
        }
        if (tokens.black === 5) {
            finalPoints += 10;
        }
        if (tokens.aqua === 5) {
            finalPoints += 10;
        }


        this.setState((prevState) => {
            return {scoreTrack: prevState.scoreTrack + finalPoints};
        });
    }

    async boardClicked(e, row) {
        const {chooseMid, changeMid, currentPieces, playerNumber, playerTurn, changeTurn, firstTaken, bagBlue, bagYellow, bagRed, bagBlack, bagAqua, changeBagPieces} = this.props;
        
        let bagPieces = {
            'bagBlue': bagBlue,
            'bagYellow': bagYellow,
            'bagRed': bagRed,
            'bagBlack': bagBlack,
            'bagAqua': bagAqua,
        };

        let mapBagTypes = {
            'blue': 'bagBlue',
            'yellow': 'bagYellow',
            'red': 'bagRed',
            'black': 'bagBlack',
            'aqua': 'bagAqua',
        };

        const pieceColor = currentPieces[0];
        const noOtherTiles = this.state.figureRow[row-1].filter((item) => item !== null && item !== pieceColor).length === 0;
        const lengthCurrentRow = this.state.figureRow[row-1].filter((item) => item !== null && item === pieceColor).length;
        const noScoredWallTile = this.state.wall[row-1].filter((item) => item === pieceColor).length === 0;
        
        if (!chooseMid && noOtherTiles && noScoredWallTile && playerTurn == playerNumber) {

            for (let i = row - 1-lengthCurrentRow; i > row-currentPieces.length - 1 - lengthCurrentRow; i--){
                await this.setState((state) => {
                    if (i >= 0) {
                        state.figureRow[row-1][i] = pieceColor;
                        return {figureRow: state.figureRow};
                    }
                    else if (state.floorRow.length < 7) {
                        state.floorRow.push(pieceColor);
                        return {floorRow: state.floorRow};
                    }
                    else {
                        bagPieces[mapBagTypes[pieceColor]] += 1;
                    }
                });
            }
            if (firstTaken == playerNumber && !this.state.tookFirst) {
                await this.setState((state) => {
                    if (state.floorRow.length < 7)
                        state.floorRow.push("numberOne");
                    return {floorRow: state.floorRow, tookFirst: true};
                });
            }

            changeBagPieces(bagPieces);
            changeTurn((playerTurn % 4) + 1);
            changeMid(true);
        }

    }

    async floorClicked(e) {
        const {chooseMid, changeMid, currentPieces, playerTurn, changeTurn, bagBlue, bagYellow, bagRed, bagBlack, bagAqua, changeBagPieces} = this.props;

        let bagPieces = {
            'bagBlue': bagBlue,
            'bagYellow': bagYellow,
            'bagRed': bagRed,
            'bagBlack': bagBlack,
            'bagAqua': bagAqua,
        };

        let mapBagTypes = {
            'blue': 'bagBlue',
            'yellow': 'bagYellow',
            'red': 'bagRed',
            'black': 'bagBlack',
            'aqua': 'bagAqua',
        };

        const pieceColor = currentPieces[0];

        if (!chooseMid) {
            for (let i=0; i < currentPieces.length; i++) {
                if (this.state.floorRow.length < 7) {
                    await this.setState((prevState) => {
                        prevState.floorRow.push(pieceColor);
                        return {floorRow: prevState.floorRow};
                    })
                }
                else {
                    bagPieces[mapBagTypes[pieceColor]] += 1;
                }
            }
            changeBagPieces(bagPieces);
            changeTurn((playerTurn % 4) + 1);
            changeMid(true);
        }


    }

    scoreWall = async () => {
        const {changeFinalRound, bagBlue, bagYellow, bagRed, bagBlack, bagAqua, changeBagPieces} = this.props;
        let scoringRows = [];
        let bagPieces = {
            'bagBlue': bagBlue,
            'bagYellow': bagYellow,
            'bagRed': bagRed,
            'bagBlack': bagBlack,
            'bagAqua': bagAqua,
        };

        let mapBagTypes = {
            'blue': 'bagBlue',
            'yellow': 'bagYellow',
            'red': 'bagRed',
            'black': 'bagBlack',
            'aqua': 'bagAqua',
        };


        let minusPoints = 0;
        for (let i=0; i < this.state.floorRow.length; i++) {
            if (this.state.floorRow[i] !== "lavender")
                bagPieces[mapBagTypes[this.state.floorRow[i]]] += 1;
            minusPoints += MINUS_TILES[i];
        }

        for (let i=0; i < this.state.figureRow.length; i++) {
            let rowOccupiedPieces = this.state.figureRow[i].filter((item) => item !== null);

            if (rowOccupiedPieces.length == i+1) {
                scoringRows.push(this.state.figureRow[i]);
                await this.setState((prevState) => {
                    prevState.figureRow[i] = Array(i+1).fill(null);
                    return {figureRow: prevState.figureRow};
                });
            }
        }
        
        for (let row of scoringRows) {

            let wall_y = row.length-1;
            let scoringTileColor = row[0];
            let wall_x;
            let scoreRow = 0;
            let scoreColumn = 0;
            let scoreTotal = 0;

            if (scoringTileColor == "blue") {
                wall_x = wall_y;
            }
            else if (scoringTileColor == "yellow") {
                wall_x = (wall_y + 1) % 5;
            }
            else if (scoringTileColor == "red") {
                wall_x = (wall_y + 2) % 5;
            }
            else if (scoringTileColor == "black") {
                wall_x = (wall_y + 3) % 5;
            }
            else if (scoringTileColor == "aqua") {
                wall_x = (wall_y + 4) % 5;
            }

            for (let x = wall_x+1; x < 5; x++) {
                if (this.state.wall[wall_y][x] === null)
                    break;
                ++scoreRow;
            }
            for (let x = wall_x-1; x >= 0; x--) {
                if (this.state.wall[wall_y][x] === null)
                    break;
                ++scoreRow;
            }
            for (let y = wall_y+1; y < 5; y++) {
                if (this.state.wall[y][wall_x] === null)
                    break;
                ++scoreColumn;
            }
            for (let y = wall_y-1; y >= 0; y--) {
                if (this.state.wall[y][wall_x] === null)
                    break;
                ++scoreColumn;
            }

            if (scoreColumn === 0 && scoreRow === 0) {
                scoreTotal = 1;
            }
            else if (scoreColumn === 0) {
                scoreTotal = scoreRow + 1;
            }
            else if (scoreRow === 0 ){
                scoreTotal = scoreColumn + 1;
            }
            else {
                scoreTotal = scoreColumn + scoreRow + 2;
            }

            bagPieces[mapBagTypes[scoringTileColor]] += wall_y;
            await this.setState((prevState) => {
                prevState.wall[wall_y][wall_x] = scoringTileColor;
                return {wall: prevState.wall, scoreTrack: prevState.scoreTrack + scoreTotal};
            });

        }

        this.setState((prevState) => {
            return {scoreTrack: Math.max(0, prevState.scoreTrack - minusPoints)};
        });
        this.setState({floorRow: [], tookFirst: false});

        for (let row of this.state.wall) {
            let fullRow = row.filter((item) => item !== null);
            if (fullRow.length === 5) changeFinalRound(true);
        }
        changeBagPieces(bagPieces);
    }

    drawScoreTable = () => {
        let table = [];
        const {playerColor} = this.props;

        for (let i=0; i < this.state.height; i++){
            let children = [];

            for (let j=0; j < this.state.width; j++) {
                let bgColor = 20*i+j+1===this.state.scoreTrack ? playerColor : "navajowhite";

                if (j === 4) children.push(<td className="score-table-td" style={{backgroundColor:bgColor}}>{20*i+5}</td>);
                else if (j === 9) children.push(<td className="score-table-td" style={{backgroundColor:bgColor}}>{20*i+10}</td>);
                else if (j === 14) children.push(<td className="score-table-td" style={{backgroundColor:bgColor}}>{20*i+15}</td>);
                else if (j === 19) children.push(<td className="score-table-td" style={{backgroundColor:bgColor}}>{20*i+20}</td>);
                else children.push(<td className="score-table-td" style={{backgroundColor:bgColor}}></td>);
            }
            
            table.push(<tr className="score-table-row">{children}</tr>);
        }

        return table;
    }

    drawPatternRow = () => {
        let table = [];

        for (let row of this.state.figureRow) {
            let children = [];

            for (let i = 0; i < 5 - row.length; i++) {
                children.push(<td className="pattern-none-td"></td>);
            }
            for (let data of row) {
                children.push(data ? <Piece size={PIECE_SIZE}  pieceType={data}/> : <Piece size={PIECE_SIZE} pieceType="emptyTile" />);
            }

            table.push(<tr className="pattern-row" ref={"row"+row.length} onClick={(e) => this.boardClicked(e, row.length)}>{children}</tr>);
        }

        return table;
    }


    drawArrows = () => {
        return([
                <tr className="arrow-row"><td className="arrow-td"><i class="fas fa-arrow-right fa-1x"></i></td></tr>,
                <tr className="arrow-row"><td className="arrow-td"><i class="fas fa-arrow-right fa-1x"></i></td></tr>,
                <tr className="arrow-row"><td className="arrow-td"><i class="fas fa-arrow-right fa-1x"></i></td></tr>,
                <tr className="arrow-row"><td className="arrow-td"><i class="fas fa-arrow-right fa-1x"></i></td></tr>,
                <tr className="arrow-row"><td className="arrow-td"><i class="fas fa-arrow-right fa-1x"></i></td></tr>,
        ]);
    }


    drawWall = () => {
        let table = [];

        for (let y = 0; y < this.state.wall.length; y++){
            let children = [];

            for (let x = 0; x < this.state.wall[y].length; x++) {
                if (x === y) children.push(<Piece size={PIECE_SIZE}  pieceType="blue" opacity={this.state.wall[y][x] ? 1 : 0.25}/>);
                else if ((y + 1) % 5 === x) children.push(<Piece size={PIECE_SIZE}  pieceType="yellow" opacity={this.state.wall[y][x] ? 1 : 0.25}/>);
                else if ((y + 2) % 5 === x) children.push(<Piece size={PIECE_SIZE}  pieceType="red" opacity={this.state.wall[y][x] ? 1 : 0.25}/>);
                else if ((y + 3) % 5 === x) children.push(<Piece size={PIECE_SIZE}  pieceType="black" opacity={this.state.wall[y][x] ? 1 : 0.25}/>);
                else if ((y + 4) % 5 === x) children.push(<Piece size={PIECE_SIZE}  pieceType="aqua" opacity={this.state.wall[y][x] ? 1 : 0.25}/>);
            }

            table.push(<tr className="wall-row">{children}</tr>);
        }
        return table;
    }


    drawFloorRow() {
        return([
            <tr style={{lineHeight: "0px"}}>
                <td className="neg-number">
                <img src={negOne} alt="" className="img-style"></img>
                </td>
                <td className="neg-number">
                <img src={negOne} alt="" className="img-style"></img>
                </td>
                <td className="neg-number">
                <img src={negTwo} alt="" className="img-style"></img>
                </td>
                <td className="neg-number">
                <img src={negTwo} alt="" className="img-style"></img>
                </td>
                <td className="neg-number">
                <img src={negTwo} alt="" className="img-style"></img>
                </td>
                <td className="neg-number">
                <img src={negThree} alt="" className="img-style"></img>
                </td>
                <td className="neg-number">
                <img src={negThree} alt="" className="img-style"></img>
                </td>
            </tr>,
            <tr onClick={(e) => this.floorClicked(e)} style={{lineHeight: "0px"}}>
                {this.state.floorRow[0] === undefined ? 
                <Piece size="0.8vw"  pieceType="emptyTile"/>:
                <Piece size="0.8vw"  pieceType={this.state.floorRow[0]}/>}
                {this.state.floorRow[1] === undefined ? 
                <Piece size="0.8vw"  pieceType="emptyTile"/>:
                <Piece size="0.8vw"  pieceType={this.state.floorRow[1]}/>}
                {this.state.floorRow[2] === undefined ? 
                <Piece size="0.8vw"  pieceType="emptyTile"/>:
                <Piece size="0.8vw"  pieceType={this.state.floorRow[2]}/>}
                {this.state.floorRow[3] === undefined ? 
                <Piece size="0.8vw"  pieceType="emptyTile"/>:
                <Piece size="0.8vw"  pieceType={this.state.floorRow[3]}/>}
                {this.state.floorRow[4] === undefined ? 
                <Piece size="0.8vw"  pieceType="emptyTile"/>:
                <Piece size="0.8vw"  pieceType={this.state.floorRow[4]}/>}
                {this.state.floorRow[5] === undefined ? 
                <Piece size="0.8vw"  pieceType="emptyTile"/>:
                <Piece size="0.8vw"  pieceType={this.state.floorRow[5]}/>}
                {this.state.floorRow[6] === undefined ? 
                <Piece size="0.8vw"  pieceType="emptyTile"/>:
                <Piece size="0.8vw"  pieceType={this.state.floorRow[6]}/>}
            </tr>,
        ]
        );
    }

    render() {
        const {playerNumber} = this.props;
        return([
                <h4 className="player-text">Player {playerNumber}</h4>,
                <div className="score-wrap">
                    <table className="score-table">
                        {this.drawScoreTable()}
                    </table>
                </div>,
                <div className="pattern-wrap">
                    <table className="pattern-table">
                        {this.drawPatternRow()}
                    </table>
                </div>,
                <div className="arrow-wrap">
                    <table className="arrow-table">
                        {this.drawArrows()}
                    </table>
                </div>,
                <div className="wall-wrap">
                    <table className="wall-table">
                        {this.drawWall()}
                    </table>
                </div>,
                <div className="floor-wrap">
                    <table className="floor-table">
                        {this.drawFloorRow()}
                    </table>
                </div>
        ]);
    }
}

export default Board;