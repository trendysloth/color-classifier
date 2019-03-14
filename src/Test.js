import React, { Component } from 'react';
import Firebase from './Firebase.js';
import p5 from 'p5';
import Train from './Train.js';
import Nav2 from './Nav2.js';
import { Container, Row, Col } from 'reactstrap';


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
    // this.displayColor = this.displayColor.bind(this);
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
    this.canvas2 = new p5(this.sketch, this.refs.wrapper4)
    // console.log('lol')
  }

  sketch = (p) => {
    p.setup = function() {
      p.createCanvas(this.width * 20, this.width * 20);
    };

    let colorDatabase = Firebase.database().ref('colors2');
    colorDatabase.once('value', this.gotData);
  };


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
  }

  


  render() {
    console.log(this.allData);
    
    return (
        <React.Fragment>
          <Nav2/>
          <Container>
            <Row>
              
              <Train allData={this.allData} labelList={this.labelList}/>
              
            </Row>
            <Row>
              <div ref="wrapper4"/>
            </Row>
          </Container>
                
          

        </React.Fragment>
          
    )
  } 
}
export default Displaycanvas; 