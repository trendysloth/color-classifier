import React, { Component } from 'react';
import p5 from 'p5';

var r, g, b;

class Newcanvas extends Component {
  constructor(props) {
    super(props);
    this.removeCanvas = this.removeCanvas.bind(this);
    this.generateCanvas = this.generateCanvas.bind(this);
    this.sketch = this.sketch.bind(this);
  }

  componentDidMount() {
    this.generateCanvas();
  }
  componentDidUpdate() {
    this.removeCanvas();
    this.generateCanvas();
  }

  removeCanvas = () => {
    this.canvas.remove();
  }

  generateCanvas = () => {
    this.canvas = new p5(this.sketch, this.refs.wrapper)
  }
  sketch = (p) => {
    r = this.props.colors[0]
    g = this.props.colors[1]
    b = this.props.colors[2]
    p.setup = function () {
      p.createCanvas(200, 200);
    };
    p.draw = function () {
      p.background(r, g, b);
      p.noStroke();
      p.push();
      p.pop();
    }
  };
  render() {
    return (
      <div ref="wrapper">
      </div>
    )
  } 
}
export default Newcanvas;