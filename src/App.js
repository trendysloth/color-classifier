import React, { Component } from 'react';
import Canvas from './Sketch.js'; //  with brackets means not default export
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Newcanvas from './Newcanvas.js';
import Displaycanvas from './Displaycanvas.js';
import RouterIndex from './RouterIndex.js';

import './App.css';

// var r = Math.floor(Math.random() * Math.floor(256))
// var g = Math.floor(Math.random() * Math.floor(256))
// var b = Math.floor(Math.random() * Math.floor(256))

var num = Math.round(0xffffff * Math.random());
var r = num >> 16;
var g = num >> 8 & 255;
var b = num & 255;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [r, g, b],
    };
    this.generateColor = this.generateColor.bind(this);
  }

  generateColor= () => {
    num = Math.round(0xffffff * Math.random());
    r = num >> 16;
    g = num >> 8 & 255;
    b = num & 255;
    // r = Math.floor(Math.random() * Math.floor(256))
    // g = Math.floor(Math.random() * Math.floor(256))
    // b = Math.floor(Math.random() * Math.floor(256))
    
    this.setState(
      { colors: [r, g, b] }, 
      () => console.log("generating new colors", this.state.colors));
  }

  render() {
    console.log('color state ' + this.state.colors)
    // this.generateColor();
    return (
      // <div>
      //   <h1>Color Perception</h1>
      //   <div className="row">
      //     <div className="col-lg-6">
      //       <Newcanvas colors={this.state.colors}/>
      //       <Canvas generateColor={this.generateColor} colors={this.state.colors}/>
      //       <Displaycanvas colors={this.state.colors}/>
      //     </div>
      //     <div className="col-lg-6">
      //     </div>
      //   </div>

      // </div>
      <RouterIndex/>
    );
  }
}

export default App;
