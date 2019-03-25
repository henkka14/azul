import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Board.css';
import Piece from './Piece.js';

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
    "royalblue",
    "yellow",
    "red",
    "black",
    "aqua",
];

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
        let tokens = {'royalblue': 0,
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

        if (tokens.royalblue === 5) {
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
        const {chooseMid, changeMid, currentPieces, playerNumber, playerTurn, changeTurn, firstTaken, bagRoyalblue, bagYellow, bagRed, bagBlack, bagAqua, changeBagPieces} = this.props;
        
        let bagPieces = {
            'bagRoyalblue': bagRoyalblue,
            'bagYellow': bagYellow,
            'bagRed': bagRed,
            'bagBlack': bagBlack,
            'bagAqua': bagAqua,
        };

        let mapBagTypes = {
            'royalblue': 'bagRoyalblue',
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
                        state.floorRow.push("lavender");
                    return {floorRow: state.floorRow, tookFirst: true};
                });
            }

            changeBagPieces(bagPieces);
            changeTurn((playerTurn % 4) + 1);
            changeMid(true);
        }

    }

    async floorClicked(e) {
        const {chooseMid, changeMid, currentPieces, playerTurn, changeTurn, bagRoyalblue, bagYellow, bagRed, bagBlack, bagAqua, changeBagPieces} = this.props;

        let bagPieces = {
            'bagRoyalblue': bagRoyalblue,
            'bagYellow': bagYellow,
            'bagRed': bagRed,
            'bagBlack': bagBlack,
            'bagAqua': bagAqua,
        };

        let mapBagTypes = {
            'royalblue': 'bagRoyalblue',
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

    scoreTable = () => {
        let table = [];
        const {playerColor} = this.props;

        for (let i=0; i < this.state.height; i++){
            let children = [];

            for (let j=0; j < this.state.width; j++) {
                let bgColor = 20*i+j+1===this.state.scoreTrack ? playerColor : "navajowhite";

                if (j === 4) children.push(<td className="table-data" style={{backgroundColor:bgColor}}>{20*i+5}</td>);
                else if (j === 9) children.push(<td className="table-data" style={{backgroundColor:bgColor}}>{20*i+10}</td>);
                else if (j === 14) children.push(<td className="table-data" style={{backgroundColor:bgColor}}>{20*i+15}</td>);
                else if (j === 19) children.push(<td className="table-data" style={{backgroundColor:bgColor}}>{20*i+20}</td>);
                else children.push(<td className="table-data" style={{backgroundColor:bgColor}}></td>);
            }
            
            table.push(<tr className="table-row">{children}</tr>);
        }

        return table;
    }

    scoreWall = async () => {
        const {changeFinalRound, bagRoyalblue, bagYellow, bagRed, bagBlack, bagAqua, changeBagPieces} = this.props;
        let scoringRows = [];
        let bagPieces = {
            'bagRoyalblue': bagRoyalblue,
            'bagYellow': bagYellow,
            'bagRed': bagRed,
            'bagBlack': bagBlack,
            'bagAqua': bagAqua,
        };

        let mapBagTypes = {
            'royalblue': 'bagRoyalblue',
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
        console.log(scoringRows);
        for (let row of scoringRows) {

            let wall_y = row.length-1;
            let scoringTileColor = row[0];
            let wall_x;
            let scoreRow = 0;
            let scoreColumn = 0;
            let scoreTotal = 0;

            if (scoringTileColor == "royalblue") {
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

    drawFigureRow = (onClick) => {
        let table = [];

        for (let row of this.state.figureRow) {
            let children = [];

            for (let i = 0; i < 5 - row.length; i++) {
                children.push(<td></td>);
            }
            for (let data of row) {
                children.push(data ? <Piece pieceType={data} /> : <td className="figure-data"></td>);
            }

            table.push(<tr ref={"row"+row.length} onClick={(e) => this.boardClicked(e, row.length)} className="figure-row">{children}</tr>);
        }

        return table;
    }

    drawWall = () => {
        let table = [];

        for (let y = 0; y < this.state.wall.length; y++){
            let children = [];

            for (let x = 0; x < this.state.wall[y].length; x++) {
                if (x === y) children.push(<td className="wall-data" style={{
                    backgroundColor: "royalblue",
                    opacity: this.state.wall[y][x] ? 1 : 0.08,
                }}></td>);
                else if ((y + 1) % 5 === x) children.push(<td className="wall-data" style={{
                    backgroundColor: "yellow",
                    opacity: this.state.wall[y][x] ? 1 : 0.08,
                }}></td>);
                else if ((y + 2) % 5 === x) children.push(<td className="wall-data" style={{
                    backgroundColor: "red",
                    opacity: this.state.wall[y][x] ? 1 : 0.08,
                }}></td>);
                else if ((y + 3) % 5 === x) children.push(<td className="wall-data" style={{
                    backgroundColor: "black",
                    opacity: this.state.wall[y][x] ? 1 : 0.08,
                }}></td>);
                else if ((y + 4) % 5 === x) children.push(<td className="wall-data" style={{
                    backgroundColor: "aqua",
                    opacity: this.state.wall[y][x] ? 1 : 0.08,
                }}></td>);
            }

            table.push(<tr className="wall-row">{children}</tr>);
        }
        return table;
    }

    drawArrows = () => {
        return([
                <tr className="arrow-data"><td><i class="fas fa-arrow-right fa-4x"></i></td></tr>,
                <tr className="arrow-data"><td><i class="fas fa-arrow-right fa-4x"></i></td></tr>,
                <tr className="arrow-data"><td><i class="fas fa-arrow-right fa-4x"></i></td></tr>,
                <tr className="arrow-data"><td><i class="fas fa-arrow-right fa-4x"></i></td></tr>,
                <tr className="arrow-data"><td><i class="fas fa-arrow-right fa-4x"></i></td></tr>,
        ]
        );
    }


    drawFloorRow() {
        return(
            <tr onClick={(e) => this.floorClicked(e)}>
                <td className="floor-row-data" style={{backgroundColor: this.state.floorRow[0]}}>-1</td>
                <td className="floor-row-data" style={{backgroundColor: this.state.floorRow[1]}}>-1</td>
                <td className="floor-row-data" style={{backgroundColor: this.state.floorRow[2]}}>-2</td>
                <td className="floor-row-data" style={{backgroundColor: this.state.floorRow[3]}}>-2</td>
                <td className="floor-row-data" style={{backgroundColor: this.state.floorRow[4]}}>-2</td>
                <td className="floor-row-data" style={{backgroundColor: this.state.floorRow[5]}}>-3</td>
                <td className="floor-row-data" style={{backgroundColor: this.state.floorRow[6]}}>-3</td>
            </tr>
        );
    }

    render() {
        const {playerNumber} = this.props;
        return(
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"/>
                <h1 style={{textAlign: "center"}}>Player {playerNumber}</h1>
                <table>
                    {this.scoreTable()}
                </table>

                <table style={{display: "inline", float:"left"}}>
                    {this.drawFigureRow()}
                </table>

                <table style={{display: "inline-block", float:"left", width:"100px"}}>
                    {this.drawArrows()}
                </table>

                <table style={{display: "block"}}>
                    {this.drawWall()}
                </table>

                <table className="floor-table">
                    {this.drawFloorRow()}
                </table>
                
            </div>
        );
    }
}

export default Board;