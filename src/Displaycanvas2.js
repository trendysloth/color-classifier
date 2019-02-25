import React, { Component } from 'react';
import Firebase from './Firebase.js';
import p5 from 'p5';
// import chroms from 'chroma';
// require('chroma');
import Train from './Train.js';
import { exists } from 'fs';



function rgbToHsl(c) {
    // console.log(c)
    var r = parseInt(c.r)/255, g = parseInt(c.g)/255, b = parseInt(c.b)/255;
    // console.log(r, g, b)
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    
    if(max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    // console.log(h, s, l)
    return new Array(h * 360, s * 100, l * 100);
}

function display(container, arr) {
    container = document.querySelector(container);
    arr.forEach(function(c) {
      var el = document.createElement("div");
      el.style.backgroundColor = "rgb(" + c.join(", ") + ")";
      container.appendChild(el);
    })
}


class Displaycanvas2 extends Component {
  constructor(props) {
    super(props);
    this.rect_x = window.innerWidth / 50;
    this.width = window.innerWidth * 0.9;
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
    // this.rgbToHsl = this.rgbToHsl.bind(this);

    this.state = {
      selectedColor: ''
    }
  }

  componentDidMount() {
    this.generateCanvas();
  }

  componentWillReceiveProps(nextProps){
    let that = this
    if (that.props !== nextProps) {
      console.log(nextProps.selectedColor)
      that.setState({
        selectedColor: nextProps.selectedColor
      })
    }

  }

  componentDidUpdate() {
    // console.log('did update')
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
      p.createCanvas(window.innerWidth * 0.9, window.innerWidth * 0.9);
    };

    let colorDatabase = Firebase.database().ref('colors2');
    // console.log(colorDatabase)
    colorDatabase.once('value', this.gotData);
  };

  
  

  displayColor = (label, x, y) => {
    let c = this.colorByLabel[label]
    let p = this.canvas2
    // console.log(p._setupDone); 
    let that = this
    // console.log(label, x, y)
    
    p.fill(0)
    // let label_display = label.split("-")[0]
    // p.text(label_display, x - this.rect_x * 0.8, y + this.rect_x * 0.5)
    // console.log(c)
    // c.sort(function(first, second) {
    //     return parseInt(first.r) - parseInt(second.r)
    // });

    let rgbArr = c
    // console.log(rgbArr)

    // var rgbArr2 = [];
    // for (var i = 0; i < 100; ++i) {
    //     rgbArr2.push([
    //         Math.floor(Math.random() * 256),
    //         Math.floor(Math.random() * 256),
    //         Math.floor(Math.random() * 256)
    //     ]);
    // }


    // display("#before", rgbArr2);

    // console.log

    var sortedRgbArr = rgbArr.map(function(element, i) {
        // Convert to HSL and keep track of original indices
        // console.log(element)
        return {color: rgbToHsl(element), index: i};
    }).sort(function(c1, c2) {
        // Sort by hue
        return c1.color[0] - c2.color[0];
    }).map(function(data) {
        // Retrieve original RGB color
        return rgbArr[data.index];
    });

    // console.log(sortedRgbArr[5], rgbArr[5])
    
    // console.log(chroma('pink').darken().saturate(2).hex())

    // console.log(c)
    // console.log(c.length)
    // c = c.slice(Math.random(0, 20), 50 + Math.random(0, 20));

    
    for (let i = 0; i < sortedRgbArr.length; i ++) {      
      p.noStroke();
      p.fill(sortedRgbArr[i].r, sortedRgbArr[i].g, sortedRgbArr[i].b);
      p.rect(x, y, that.rect_x, that.rect_x);
      x = x + that.rect_x;
      if (x > that.width - 2 * that.rect_x) {
        x = that.rect_x;
        y = y + that.rect_x;
      }
    }
  }

  gotData = (results) => {
    let data = results.val();
    let keys = Object.keys(data);
    
    // keys = keys.slice(Math.random(0, 300), 100 + Math.random(0, 300));
    // console.log(keys[0])
    // let counter = 0;
    for (let key of keys) {
      // if (counter < 100) {
        
      //   // counter = counter + 1
      // }
      let record = data[key];
      // console.log(record)
      this.colorByLabel[record.label].push(record);
      this.allData.entries.push(record);
      
    }
    // counter = 0

    // console.log(this.colorByLabel, this.state.selectedColor)
    // let that = this
    // for (let key in this.colorByLabel) {
    //   // if (counter < 100) {
        

    //   // }
      
      
    // }
    if (this.state.selectedColor !== '') {
      this.color_labels.push(this.state.selectedColor)
      this.y_init = this.y_init + this.rect_x;
      this.x_pos.push(this.rect_x)
      this.y_pos.push(this.y_init)
      // counter = counter + 1
    }

    for (let i = 0; i < this.x_pos.length; i ++) {
      this.displayColor(this.color_labels[i], this.x_pos[i], this.y_pos[i])
    }
    // console.log(this.allData)
  }

  


  render() {
    
    return (
      <React.Fragment>
        {/* <div>
          <Train allData={this.allData} labelList={this.labelList}/>
        </div> */}
        


        <div ref="wrapper2">
        </div>
      </React.Fragment>
    )
  } 
}
export default Displaycanvas2; 