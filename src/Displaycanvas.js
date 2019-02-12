import React, { Component } from 'react';
import Firebase from './Firebase.js';
import p5 from 'p5';
import { exists } from 'fs';

class Displaycanvas extends Component {
  constructor(props) {
    super(props);
    this.rect_x = 40;
    this.width = this.rect_x * 80;
    this.colorByLabel = {
      'blue-ish': [],
      'green-ish': [],
      'pink-ish': [],
      'grey-ish': [],
      'red-ish': [],
      'purple-ish': [],
      'brown-ish': [],
      'orange-ish': [], 
      'yellow-ish': []
    }
    this.allData = {
      entries: []
    }
    this.x_pos = []
    this.y_pos = []
    this.color_labels = []
    this.y_init = 0

    this.removeCanvas = this.removeCanvas.bind(this);
    this.generateCanvas = this.generateCanvas.bind(this);
    this.gotData = this.gotData.bind(this);
    this.displayColor = this.displayColor.bind(this);
    this.sketch = this.sketch.bind(this);
  }

  componentDidMount() {
    this.generateCanvas();
  }

  componentDidUpdate() {
    console.log('did update')
    this.removeCanvas();
    this.colorByLabel = {
      'blue-ish': [],
      'green-ish': [],
      'pink-ish': [],
      'grey-ish': [],
      'red-ish': [],
      'purple-ish': [],
      'brown-ish': [],
      'orange-ish': [], 
      'yellow-ish': []
    }
    this.allData = {
      entries: []
    }
    this.x_pos = []
    this.y_pos = []
    this.color_labels = []
    this.y_init = 0
    this.generateCanvas();
  }

  removeCanvas = () => {
    this.canvas2.remove();
  }

  generateCanvas = () => {
    this.canvas2 = new p5(this.sketch, this.refs.wrapper2)
  }

  sketch = (p) => {
    p.setup = function() {
      p.createCanvas(this.width * 20, this.width * 20);
    };

    let colorDatabase = Firebase.database().ref('colors2');
    colorDatabase.once('value', this.gotData);
  };



  displayColor = (label, x, y) => {
    let c = this.colorByLabel[label]
    let p = this.canvas2
    // console.log(p._setupDone); 
    let that = this
    // console.log(label, x, y)
    
    p.fill(0)
    let label_display = label.split("-")[0]
    p.text(label_display, x - this.rect_x * 0.8, y + this.rect_x * 0.5)

    // console.log(c.length)
    // c = c.slice(Math.random(0, 20), 50 + Math.random(0, 20));
    for (let i = 0; i < c.length; i ++) {      
      p.noStroke();
      p.fill(c[i].r, c[i].g, c[i].b);
      p.rect(x, y, that.rect_x, that.rect_x);
      x = x + that.rect_x;
      if (x >= that.width) {
          x = this.rect_x;
          y = y + that.rect_x;
      }
    }
  }

  gotData = (results) => {
    let data = results.val();
    let keys = Object.keys(data);
    
    // keys = keys.slice(Math.random(0, 300), 100 + Math.random(0, 300));
    console.log(keys[0])
    // let counter = 0;
    for (let key of keys) {
      // if (counter < 100) {
        
      //   // counter = counter + 1
      // }
      let record = data[key];
      console.log(record)
      this.colorByLabel[record.label].push(record);
      this.allData.entries.push(record);
      
    }
    // counter = 0
    for (let key in this.colorByLabel) {
      // if (counter < 100) {
        
      // }
      this.color_labels.push(key)
      this.y_init = this.y_init + this.rect_x;
      this.x_pos.push(this.rect_x)
      this.y_pos.push(this.y_init)
      // counter = counter + 1
    }

    for (let i = 0; i < this.x_pos.length; i ++) {
      this.displayColor(this.color_labels[i], this.x_pos[i], this.y_pos[i])
    }
  }
  render() {
    return (
      <React.Fragment>
        <div ref="wrapper2">
        </div>
      </React.Fragment>
      
    )
  } 
}
export default Displaycanvas; 