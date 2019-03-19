import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board.js';
import MidTable from './MidTable.js';

class App extends Component {
  render() {
    return (

      <div className="App">
      <div className="rotate-board180">
        <Board />
      </div>

      <div className="middle-row">
        <div className="rotate-board90"><Board/></div><div style={{display:"inline-block", width: "1350px", height: "1350px", position: "relative"}}><MidTable /></div><div className="rotate-board270"><Board/></div>
      </div>

      <div style={{margin:"0 auto", width: "846px", height: "702px"}}>
        <Board />
      </div>

      </div>
    );
  }
}

export default App;
