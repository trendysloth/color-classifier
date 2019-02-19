import React, { Component } from 'react';
import Canvas from './Sketch.js'; //  with brackets means not default export
import Newcanvas from './Newcanvas.js';
import Nav from './Nav.js'
import Displaycanvas from './Displaycanvas.js';
import { Container, Row, Col } from 'reactstrap';
import './App.css';

// var r = Math.floor(Math.random() * Math.floor(256))
// var g = Math.floor(Math.random() * Math.floor(256))
// var b = Math.floor(Math.random() * Math.floor(256))

var num = Math.round(0xffffff * Math.random());
var r = num >> 16;
var g = num >> 8 & 255;
var b = num & 255;

class Datacollection extends Component {
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
      <div>
        <Nav/>
       
        <Container>
          Color Perception
          <Row>

            <Col>
              
              <Newcanvas colors={this.state.colors}/>
              <Canvas generateColor={this.generateColor} colors={this.state.colors}/>
              <Displaycanvas colors={this.state.colors}/>
            </Col>
            
          </Row>

        </Container>

      </div>
    );
  }
}

export default Datacollection;
