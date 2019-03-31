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
        bagBlue: 0,
        bagYellow: 0,
        bagRed: 0,
        bagBlack: 0,
        bagAqua: 0,
        finalRound: false,
        blue: 0,
        yellow: 0,
        red: 0,
        black: 0,
        aqua: 0,
    };

    this.changeCurrentPieces = this.changeCurrentPieces.bind(this);
    this.changeMid = this.changeMid.bind(this);
    this.changeTurn = this.changeTurn.bind(this);
    this.changeScoringTime = this.changeScoringTime.bind(this);
    this.gameStateInfo = this.gameStateInfo.bind(this);
    this.firstTaken = this.firstTaken.bind(this);
    this.changeBagPieces = this.changeBagPieces.bind(this);
    this.changeFinalRound = this.changeFinalRound.bind(this);
    this.remainingTileInfo = this.remainingTileInfo.bind(this);

    this.midTable = React.createRef();
  }

  changeFinalRound(finalRound) {
    this.setState({finalRound});
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

    if (this.state.scoringTime && this.state.chooseMid && !this.state.finalRound) {
      let board1 = this.refs.Board1;
      let board2 = this.refs.Board2;
      let board3 = this.refs.Board3;
      let board4 = this.refs.Board4;

      await board1.scoreWall();
      await board2.scoreWall();
      await board3.scoreWall();
      await board4.scoreWall();

      if (this.state.finalRound) {
        await board1.scoreFinalPoints();
        await board2.scoreFinalPoints();
        await board3.scoreFinalPoints();
        await board4.scoreFinalPoints();
      }

      await this.setState((prevState) => {
                  return {scoringTime: false,
                          playerTurn: prevState.firstTaken, 
                          firstTaken: 0
                        };
      });
      await this.midTable.current.refillPieces();
    }
  }

  remainingTileInfo() {
    return(
      [
      <div className="tile-bag-info">
        <h1>Tiles in bag:</h1>
          <h2 style={{margin: "0"}}>Blue: {this.state.blue}</h2>
          <h2 style={{margin: "0"}}>Yellow: {this.state.yellow}</h2>
          <h2 style={{margin: "0"}}>Red: {this.state.red}</h2>
          <h2 style={{margin: "0"}}>Black: {this.state.black}</h2>
          <h2 style={{margin: "0"}}>Aqua: {this.state.aqua}</h2>
      </div>,
      <div className="tile-lid-info">
        <h1>Tiles in lid:</h1>
          <h2 style={{margin: "0"}}>Blue: {this.state.bagBlue}</h2>
          <h2 style={{margin: "0"}}>Yellow: {this.state.bagYellow}</h2>
          <h2 style={{margin: "0"}}>Red: {this.state.bagRed}</h2>
          <h2 style={{margin: "0"}}>Black: {this.state.bagBlack}</h2>
          <h2 style={{margin: "0"}}>Aqua: {this.state.bagAqua}</h2>
      </div>
      ]
    );
  }

  gameStateInfo() {
    return(
      <div className="state-info">
      {this.state.finalRound ? null : <h1>Player {this.state.playerTurn} turn!</h1>}
      {this.state.finalRound ? <h1>Game ended!</h1> : (this.state.chooseMid ? <h1>Choose tokens from middle!</h1> : <h1>You have {this.state.currentPieces.length} {this.state.currentPieces[0]} tokens,<br/> place them to your figure row!</h1>)}
      </div>
    );
  }

  changeScoringTime(scoringTime) {
    this.setState({scoringTime});
  }

  firstTaken(firstTaken) {
    this.setState({firstTaken});
  }

  componentDidUpdate(prevProps, prevState) {
    const bagPieces = this.midTable.current.getPieces();
    if (prevState.red !== bagPieces.red ||
        prevState.blue !== bagPieces.blue ||
        prevState.yellow !== bagPieces.yellow ||
        prevState.black !== bagPieces.black ||
        prevState.aqua !== bagPieces.aqua)
    this.setState(this.midTable.current.getPieces());
  }

  render() {
    return (
      <div className="background">
      <div className="App">
      
      <div className="top">
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
               bagBlue={this.state.bagBlue}
               bagYellow={this.state.bagYellow}
               bagRed={this.state.bagRed}
               bagBlack={this.state.bagBlack}
               bagAqua={this.state.bagAqua}
               changeFinalRound={this.changeFinalRound}
          />
          </div>
      </div>

      <div className="middle">
        <div className="rotate90"><Board 
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
                                          bagBlue={this.state.bagBlue}
                                          bagYellow={this.state.bagYellow}
                                          bagRed={this.state.bagRed}
                                          bagBlack={this.state.bagBlack}
                                          bagAqua={this.state.bagAqua}
                                          changeFinalRound={this.changeFinalRound}
                                        /></div><div className="platform-tiles"
                                                        ><MidTable 
                                                          ref={this.midTable}
                                                          chooseMid={this.state.chooseMid}
                                                          changeMid={this.changeMid}
                                                          currentPieces={this.state.currentPieces}
                                                          changeCurrentPieces={this.changeCurrentPieces}
                                                          firstTaken={this.firstTaken}
                                                          playerTurn={this.state.playerTurn}
                                                          scoringTime={this.state.scoringTime}
                                                          changeScoringTime={this.changeScoringTime}
                                                          bagBlue={this.state.bagBlue}
                                                          bagYellow={this.state.bagYellow}
                                                          bagRed={this.state.bagRed}
                                                          bagBlack={this.state.bagBlack}
                                                          bagAqua={this.state.bagAqua}
                                                          changeBagPieces={this.changeBagPieces}
                                                          finalRound={this.state.finalRound}
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
                                                          bagBlue={this.state.bagBlue}
                                                          bagYellow={this.state.bagYellow}
                                                          bagRed={this.state.bagRed}
                                                          bagBlack={this.state.bagBlack}
                                                          bagAqua={this.state.bagAqua}
                                                          changeFinalRound={this.changeFinalRound}/></div>
      </div>

      <div className="bottom">
        <div className="no-rotate-board">
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
                bagBlue={this.state.bagBlue}
                bagYellow={this.state.bagYellow}
                bagRed={this.state.bagRed}
                bagBlack={this.state.bagBlack}
                bagAqua={this.state.bagAqua}
                changeFinalRound={this.changeFinalRound}/>
        </div>
      </div>
      {this.remainingTileInfo()}
      {this.gameStateInfo()}
      
    </div>
    
    </div>
    );
  }
}

export default App;
