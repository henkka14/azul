import React, { Component } from 'react';
import './Board.css';
import Piece from './Piece.js';

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scoreTrack: 0,
            wall: Array(5).fill().map(() => Array(5).fill(null)),
            floorRow: Array(7).fill(),
            figureRow: Array(5).fill().map((item,i) => Array(i+1).fill(null)),
        };
    }

    render() {
        return(
            <div>
                <div className="scoreTrack">
                    <ScoreTrack figureRow={this.state.figureRow} wall={this.state.wall}/>
                </div>
            </div>
        );

    };

}

class ScoreTrack extends Component {

    constructor(props) {
        super(props);

        this.w = 10;
        this.h = 10;
        this.state = {
            row: 0,
            column: 0,
            width: 20,
            height: 5,
        };
    }

    scoreTable = () => {
        let table = [];

        for (let i=0; i < this.state.height; i++){
            let children = [];

            for (let j=0; j < this.state.width; j++) {
                if (j === 4) children.push(<td className="table-data">{20*i+5}</td>);
                else if (j === 9) children.push(<td className="table-data">{20*i+10}</td>);
                else if (j === 14) children.push(<td className="table-data">{20*i+15}</td>);
                else if (j === 19) children.push(<td className="table-data">{20*i+20}</td>);
                else children.push(<td className="table-data"></td>);
            }
            
            table.push(<tr className="table-row">{children}</tr>);
        }

        return table;
    }

    drawFigureRow = () => {
        const {figureRow} = this.props;
        let table = [];

        for (let row of figureRow) {
            let children = [];

            for (let i = 0; i < 5 - row.length; i++) {
                children.push(<td></td>);
            }
            for (let data of row) {
                children.push(data ? <Piece type={data} /> : <td className="figure-data"></td>);
            }

            table.push(<tr className="figure-row">{children}</tr>);
        }

        return table;
    }

    drawWall = () => {
        const {wall} = this.props;
        let table = [];

        for (let x = 0; x < wall.length; x++){
            let children = [];

            for (let y = 0; y < wall[x].length; y++) {
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
                <td className="floor-row-data">-1</td>
                <td className="floor-row-data">-1</td>
                <td className="floor-row-data">-2</td>
                <td className="floor-row-data">-2</td>
                <td className="floor-row-data">-2</td>
                <td className="floor-row-data">-3</td>
                <td className="floor-row-data">-3</td>
            </tr>
        );
    }

    render() {
        return(
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"/>
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