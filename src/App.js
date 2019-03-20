import React, { Component } from 'react';
import './App.css';
import Board from './Board.js';
import MidTable from './MidTable.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        currentPieces: [],
        chooseMid: true,
        playerTurn: 1,
        firstTaken: 0,
    };

    this.changeCurrentPieces = this.changeCurrentPieces.bind(this);
    this.changeMid = this.changeMid.bind(this);
    this.changeTurn = this.changeTurn.bind(this);
    this.gameStateInfo = this.gameStateInfo.bind(this);
    this.firstTaken = this.firstTaken.bind(this);
  }

  changeTurn(playerTurn) {
    this.setState({playerTurn});
  }

  changeCurrentPieces(currentPieces) {
    this.setState({currentPieces});
  }

  changeMid(chooseMid) {
    this.setState({chooseMid});
  }

  gameStateInfo() {
    return(
      [
      <h1>Player {this.state.playerTurn} turn!</h1>,
      this.state.chooseMid ? <h1>Choose tokens from middle!</h1> : <h1>You have {this.state.currentPieces.length} {this.state.currentPieces[0]} tokens, place them to your figure row!</h1>,
      ]

    );
  }

  firstTaken(firstTaken) {
    this.setState({firstTaken});
  }

  render() {
    return (

      <div className="App">

      <div className="state-info">
        {this.gameStateInfo()}
      </div>

      <div className="rotate-board180">
        <Board playerTurn={this.state.playerTurn}
               changeTurn={this.changeTurn}
               playerNumber="3"
               currentPieces={this.state.currentPieces}
               chooseMid={this.state.chooseMid}
               changeMid={this.changeMid}
               firstTaken={this.state.firstTaken}
          />
      </div>

      <div className="middle-row">
        <div className="rotate-board90"><Board 
                                          playerTurn={this.state.playerTurn}
                                          changeTurn={this.changeTurn}
                                          playerNumber="2"
                                          currentPieces={this.state.currentPieces}
                                          chooseMid={this.state.chooseMid}
                                          changeMid={this.changeMid}
                                          firstTaken={this.state.firstTaken}
                                        /></div><div style={{
                                                          display:"inline-block",
                                                          width: "1350px",
                                                          height: "1350px",
                                                          position: "relative",
                                                        }}><MidTable 
                                                          chooseMid={this.state.chooseMid}
                                                          changeMid={this.changeMid}
                                                          currentPieces={this.state.currentPieces}
                                                          changeCurrentPieces={this.changeCurrentPieces}
                                                          firstTaken={this.firstTaken}
                                                          playerTurn={this.state.playerTurn}
                                                        /></div><div 
                                                          className="rotate-board270"
                                                        ><Board
                                                          playerTurn={this.state.playerTurn}
                                                          changeTurn={this.changeTurn}
                                                          playerNumber="4"
                                                          currentPieces={this.state.currentPieces}
                                                          chooseMid={this.state.chooseMid}
                                                          changeMid={this.changeMid}
                                                          firstTaken={this.state.firstTaken}/></div>
      </div>

      <div style={{margin:"0 auto", width: "846px", height: "702px"}}>
        <Board playerTurn={this.state.playerTurn}
               changeTurn={this.changeTurn}
               playerNumber="1"
               currentPieces={this.state.currentPieces}
               chooseMid={this.state.chooseMid}
               changeMid={this.changeMid}
               firstTaken={this.state.firstTaken}/>
      </div>

      </div>
    );
  }
}

export default App;
