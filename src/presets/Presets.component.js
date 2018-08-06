import React, { Component } from 'react';
import './Presets.css';

let presetArray = [{
  displayName: 'Default',
  value: 'default'
}]

class Presets extends Component {
  render() {
    return (
      <div className="Presets">
        <header className="Presets-header">
          <h1 className="Presets-title">Options:</h1>
          {presetArray.map((preset,i)=>(<button key={i}>{preset.displayName}</button>))}
        </header>
      </div>
    );
  }
}

export default Presets;
