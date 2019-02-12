
import React, { Component } from 'react';
import Buttons from './Buttons.js';

var r, g, b
var colors;
export function Sketch (p) {
    r = colors[0]
    g = colors[1]
    b = colors[2]

    var rotation = 0;
    p.setup = function () {
      p.createCanvas(200, 200);
    };

    p.draw = function () {
      p.background(r, g, b);
      p.noStroke();
      p.push();
      p.rotateY(rotation);
      p.box(100);
      p.pop();
    }
};

class Canvas extends Component {
  render() {
    let buttons = ['blue-ish', 'green-ish', 'pink-ish', 'grey-ish', 'red-ish', 'purple-ish',
                   'brown-ish', 'orange-ish', 'yellow-ish']
    r = this.props.colors[0]
    g = this.props.colors[1]
    b = this.props.colors[2]

    let allButtons = buttons.map((button, index) => {
      return <Buttons button={button} r={r} g={g} b={b} draw={Sketch} 
                      generateColor={this.props.generateColor}/>
    })
    return (
      <div>
        {allButtons}
      </div>
     
    )
  } 
}
export default Canvas;