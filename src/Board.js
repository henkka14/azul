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

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 20,
            height: 5,
            scoreTrack: 0,
            wall: Array(5).fill().map(() => Array(5).fill(null)),
            floorRow: [],
            figureRow: Array(5).fill().map((item,i) => Array(i+1).fill(null)),
            tookFirst: false,
        };
        this.boardClicked = this.boardClicked.bind(this);

    }

    async boardClicked(e, row) {
        const {chooseMid, changeMid, currentPieces, playerNumber, playerTurn, changeTurn, firstTaken, scoringTime} = this.props;
        const pieceColor = currentPieces[0];
        const noOtherTiles = this.state.figureRow[row-1].filter((item) => item !== null && item !== pieceColor).length === 0;
        const lengthCurrentRow = this.state.figureRow[row-1].filter((item) => item !== null && item === pieceColor).length;
        
        if (!chooseMid && noOtherTiles && playerTurn == playerNumber) {

            for (let i = row - 1-lengthCurrentRow; i > row-currentPieces.length - 1 - lengthCurrentRow; i--){
                await this.setState((state) => {
                    if (i >= 0) {
                        state.figureRow[row-1][i] = pieceColor;
                        return {figureRow: state.figureRow};
                    }
                    else {
                        state.floorRow.push(pieceColor);
                        return {floorRow: state.floorRow};
                    }
                });
            }
            if (firstTaken == playerNumber && !this.state.tookFirst) {
                await this.setState((state) => {
                    state.floorRow.push("lavender");
                    return {floorRow: state.floorRow, tookFirst: true};
                });
            }
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

    scoreWall = () => {
        const {changeScoringTime, playerNumber} = this.props;
        console.log("scoring player" + playerNumber);

        let minusPoints = 0;
        for (let i=0; i < this.state.floorRow.length; i++) {
            minusPoints += MINUS_TILES[i];
        }
        this.setState({floorRow: []});
        console.log(minusPoints);

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

        for (let x = 0; x < this.state.wall.length; x++){
            let children = [];

            for (let y = 0; y < this.state.wall[x].length; y++) {
                if (x === y) children.push(<td className="wall-data" style={{backgroundColor: "royalblue"}}></td>);
                else if ((x + 1) % 5 === y) children.push(<td className="wall-data" style={{backgroundColor: "yellow"}}></td>);
                else if ((x + 2) % 5 === y) children.push(<td className="wall-data" style={{backgroundColor: "red"}}></td>);
                else if ((x + 3) % 5 === y) children.push(<td className="wall-data" style={{backgroundColor: "black"}}></td>);
                else if ((x + 4) % 5 === y) children.push(<td className="wall-data" style={{backgroundColor: "aqua"}}></td>);
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
            <tr>
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