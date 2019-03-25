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
        scoringTime: false,
        bagRoyalblue: 0,
        bagYellow: 0,
        bagRed: 0,
        bagBlack: 0,
        bagAqua: 0,
    };

    this.changeCurrentPieces = this.changeCurrentPieces.bind(this);
    this.changeMid = this.changeMid.bind(this);
    this.changeTurn = this.changeTurn.bind(this);
    this.changeScoringTime = this.changeScoringTime.bind(this);
    this.gameStateInfo = this.gameStateInfo.bind(this);
    this.firstTaken = this.firstTaken.bind(this);
    this.changeBagPieces = this.changeBagPieces.bind(this);
  }

  changeBagPieces(bagPieces) {
    this.setState(bagPieces);
  }

  changeTurn(playerTurn) {
    this.setState({playerTurn});
  }

  changeCurrentPieces(currentPieces) {
    this.setState({currentPieces});
  }

  async changeMid(chooseMid) {
    await this.setState({chooseMid});

    if (this.state.scoringTime && this.state.chooseMid) {
      let board1 = this.refs.Board1;
      let board2 = this.refs.Board2;
      let board3 = this.refs.Board3;
      let board4 = this.refs.Board4;

      await board1.scoreWall();
      await board2.scoreWall();
      await board3.scoreWall();
      await board4.scoreWall();

      await this.setState((prevState) => {
                  return {scoringTime: false,
                          playerTurn: prevState.firstTaken, 
                          firstTaken: 0
                        };
      });
    }
  }

  gameStateInfo() {
    return(
      [
      <h1>Player {this.state.playerTurn} turn!</h1>,
      this.state.chooseMid ? <h1>Choose tokens from middle!</h1> : <h1>You have {this.state.currentPieces.length} {this.state.currentPieces[0]} tokens, place them to your figure row!</h1>,
      ]
    );
  }

  changeScoringTime(scoringTime) {
    this.setState({scoringTime});
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
        <Board ref="Board3"
               playerTurn={this.state.playerTurn}
               changeTurn={this.changeTurn}
               playerNumber="3"
               currentPieces={this.state.currentPieces}
               chooseMid={this.state.chooseMid}
               changeMid={this.changeMid}
               firstTaken={this.state.firstTaken}
               playerColor="red"
               changeScoringTime={this.changeScoringTime}
               changeBagPieces={this.changeBagPieces}
               bagRoyalblue={this.state.bagRoyalblue}
               bagYellow={this.state.bagYellow}
               bagRed={this.state.bagRed}
               bagBlack={this.state.bagBlack}
               bagAqua={this.state.bagAqua}
          />
      </div>

      <div className="middle-row">
        <div className="rotate-board90"><Board 
                                          ref="Board2"
                                          playerTurn={this.state.playerTurn}
                                          changeTurn={this.changeTurn}
                                          playerNumber="2"
                                          currentPieces={this.state.currentPieces}
                                          chooseMid={this.state.chooseMid}
                                          changeMid={this.changeMid}
                                          firstTaken={this.state.firstTaken}
                                          playerColor="black"
                                          scoringTime={this.state.scoringTime}
                                          changeScoringTime={this.changeScoringTime}
                                          changeBagPieces={this.changeBagPieces}
                                          bagRoyalblue={this.state.bagRoyalblue}
                                          bagYellow={this.state.bagYellow}
                                          bagRed={this.state.bagRed}
                                          bagBlack={this.state.bagBlack}
                                          bagAqua={this.state.bagAqua}
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
                                                          scoringTime={this.state.scoringTime}
                                                          changeScoringTime={this.changeScoringTime}
                                                          bagRoyalblue={this.state.bagRoyalblue}
                                                          bagYellow={this.state.bagYellow}
                                                          bagRed={this.state.bagRed}
                                                          bagBlack={this.state.bagBlack}
                                                          bagAqua={this.state.bagAqua}
                                                          changeBagPieces={this.changeBagPieces}
                                                        /></div><div 
                                                          className="rotate-board270"
                                                        ><Board
                                                          ref="Board4"
                                                          playerTurn={this.state.playerTurn}
                                                          changeTurn={this.changeTurn}
                                                          playerNumber="4"
                                                          currentPieces={this.state.currentPieces}
                                                          chooseMid={this.state.chooseMid}
                                                          changeMid={this.changeMid}
                                                          firstTaken={this.state.firstTaken}
                                                          playerColor="blue"
                                                          scoringTime={this.state.scoringTime}
                                                          changeScoringTime={this.changeScoringTime}
                                                          changeBagPieces={this.changeBagPieces}
                                                          bagRoyalblue={this.state.bagRoyalblue}
                                                          bagYellow={this.state.bagYellow}
                                                          bagRed={this.state.bagRed}
                                                          bagBlack={this.state.bagBlack}
                                                          bagAqua={this.state.bagAqua}/></div>
      </div>

      <div style={{margin:"0 auto", width: "846px", height: "702px"}}>
        <Board ref="Board1"
               playerTurn={this.state.playerTurn}
               changeTurn={this.changeTurn}
               playerNumber="1"
               currentPieces={this.state.currentPieces}
               chooseMid={this.state.chooseMid}
               changeMid={this.changeMid}
               firstTaken={this.state.firstTaken}
               playerColor="yellow"
               scoringTime={this.state.scoringTime}
               changeScoringTime={this.changeScoringTime}
               changeBagPieces={this.changeBagPieces}
               bagRoyalblue={this.state.bagRoyalblue}
               bagYellow={this.state.bagYellow}
               bagRed={this.state.bagRed}
               bagBlack={this.state.bagBlack}
               bagAqua={this.state.bagAqua}/>
      </div>

      </div>
    );
  }
}

export default App;
