import React, { Component } from 'react';
import './Board.css';

let board = {};

/*
sampleBoard = [
  'XXXXX',
  'X....',
  '....X',
  'XXXXX'
]
*/

// TODO: Add non-rectangles
let chamberSizes = [
  [20,20,0],
  [30,30,0],
  [40,40,0],
  [20,30,0],
  [30,40,0],
  [40,50,1],
  [50,80,1],
  [60,60,1]
];
let exitNumbers = [
  [0,1,2,3,4],
  [0,1,2,3,4,5,6]
];
let possibleEgressSides = ['top','bottom','left','right'];

class Board extends Component {
  init (){
    let roomSpec = this.randomRoom();
    if (!roomSpec[2]) roomSpec[2] = 1; // Default at least one exit for the first room
    // TODO: eventually make this first one roll on the starting area table
    this.addRoom(roomSpec[0],roomSpec[1],roomSpec[2],1,1,possibleEgressSides[2]);
  }
  addRoom (height, width, numOfExits, x, y, entranceSide){
    console.log('height, width, numOfExits, x, y, entranceSide: ',height, width, numOfExits, x, y, entranceSide);
    let entrance = [];
    let exits = [];
    for (var i = 0; i < numOfExits; i++) {
      exits.push(possibleEgressSides[Math.floor(Math.random()*possibleEgressSides.length)]);
    }
    exits = exits.reduce((tally, side)=>{
      tally[side]++;
      return tally;
    },{'top':0,'bottom':0,'left':0,'right':0});
    exits[entranceSide]++;
    console.log('exits: ',exits);
    let roomAscii = new Array(height+2);
    for (var currY = 0; currY < (height+2); currY++) {
      roomAscii[currY] = '';
      for (var currX = 0; currX < (width+2); currX++) {
        if (currY === 0 && exits['top'] > 0 && currX!==0 && currX!==(width+1)) {
          // if no entrance right before and there's still exits to be assigned
          // Randomly is 1 or 0, so truthy or falsey
          // TODO: fix probability to spread exits according to length of wall
          if (roomAscii[currY][currX - 1]!=='.' && Math.round(Math.random())) {
            roomAscii[currY] = roomAscii[currY] + '.';
            exits['top']--;
          } else {
            roomAscii[currY] = roomAscii[currY] + 'X';
          }
        } else if (currY === 0) {
          roomAscii[currY] = roomAscii[currY] + 'X';
        }else if (currY === (height+2) && exits['bottom'] > 0 && currX!==0 && currX!==(width+1)) {
          if (roomAscii[currY][currX - 1]!=='.' && Math.round(Math.random())) {
            roomAscii[currY] = roomAscii[currY] + '.';
            exits['top']--;
          } else {
            roomAscii[currY] = roomAscii[currY] + 'X';
          }
        } else if (currY === (y+2)) {
          roomAscii[currY] = roomAscii[currY] + 'X';
        } else {
          roomAscii[currY] = roomAscii[currY] + '.';
        }
      }
    }

    // if (entranceSide === 'top') {
    //   entrance = [Math.floor(Math.random() * width), 0];
    //   // board[(x-1)] = board[(x-1)].slice(0, y-1) +
    // } else if (entranceSide === 'bottom') {
    //   entrance = [Math.floor(Math.random() * width), height];
    // } else if (entranceSide === 'left') {
    //   entrance = [0, Math.floor(Math.random() * height)];
    // } else if (entranceSide === 'right') {
    //   entrance = [width, Math.floor(Math.random() * height)];
    // }
    if (numOfExits === undefined) {
      // TODO: make exit opposite the entrance, because it's a hallway
    }
  }
  randomRoom (){
    // Get a random chamber size from the array
    let size = chamberSizes[Math.floor(Math.random()*chamberSizes.length)];
    // Get a random number of chamber exits based on chamber size
    // 1st array for small, 2nd for large
    let exitNumberArray = exitNumbers[size[2]];
    let exits = exitNumberArray[Math.floor(Math.random()*exitNumberArray.length)];
    return [size[0], size[1], exits];
  }
  randomHall () {

  }
  canFit() {
    // TODO: implement fit check
    return true;
  }
  render() {
    this.init();
    return (
      <div className="Board">
        <header className="Board-header">
          <h1 className="Board-title">Board:</h1>
        </header>
      </div>
    );
  }
}

export default Board;
