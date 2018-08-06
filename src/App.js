import React, { Component } from 'react';
import Board from './board/Board.component.js'
import Presets from './presets/Presets.component.js'
// import AsciiLogoArray from './assets/ascii-logo.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*AsciiLogoArray.map(string=>(<div className='asciiLogo'>{string}</div>))*/}
          <h1 className="App-title">Welcome to D&D 5e Random Dungeon Generator</h1>
          <Presets />
        </header>
        <Board />
      </div>
    );
  }
}

export default App;
