import React, { Component } from 'react';
import Firebase from './Firebase.js';
import Nav2 from './Nav2.js';
import * as d3 from 'd3';
import Displaycanvas2 from './Displaycanvas2.js';

const blueData = [];
const greenData = [];
const pinkData = [];
const greyData = [];
const redData = [];
const purpleData = [];
const brownData = [];
const orangeData = [];
const yellowData = [];

var avgBlue = [0, 0, 0]
var avgGreen = [0, 0, 0]
var avgPink = [0, 0, 0]
var avgGrey = [0, 0, 0]
var avgRed = [0, 0, 0]
var avgPurple = [0, 0, 0]
var avgBrown = [0, 0, 0]
var avgOrange = [0, 0, 0]
var avgYellow = [0, 0, 0]
var fillColors = []
// var bars;


var avgRGBs;
var datalength;

class Visualization extends Component {
  constructor(props) {
    super(props);
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

    this.margin = {top: 30, right: 100, bottom: 30, left: 100}
    this.width = window.innerWidth - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;

    this.x = d3.scaleBand().range([0, this.width]);
    this.variables = ['blue', 'green', 'pink', 'grey', 'red',
                      'purple', 'brown', 'orange', 'yellow']

    this.variables2 = [
      'blue-ish', 'green-ish', 'pink-ish', 'grey-ish', 'red-ish',
      'purple-ish', 'brown-ish', 'orange-ish', 'yellow-ish'
    ]
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.bandwidth = this.width * 0.6 / (this.variables.length + 1);

    // this.bars;

    // this.generateCanvas = this.generateCanvas.bind(this);
    this.gotData2 = this.gotData2.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {
      loaded: false,
      selectedColor: '', 
      loaded2: false     
    }
  }


  onClick(color) {
    this.setState({
      selectedColor: color
    }, console.log(color))
  }
  componentDidMount() {
    let that = this
    async function asyncCall() {
        let colorDatabase = Firebase.database().ref('colors2');
        await colorDatabase.once('value', that.gotData2);
    }
    
    asyncCall();


  }

  get xAxis(){
    // console.log('drawing xaxis...', this.x, this.y)
    return d3.axisBottom(this.x).ticks(9);
  }

  get yAxis(){
    var format = d3.format(".2s");
    return d3.axisLeft(this.y)
             .ticks(5)
             .tickFormat(function(d) {
                return format(d)
             });
  }

  drawXAxis = (e) =>{
    console.log("event", this.refs.xaxis);
    d3.select(this.refs.xaxis).call(this.xAxis);
  }

  drawYAxis(){
    d3.select(this.refs.yaxis).call(this.yAxis);
  }

  formatData(data) {
    this.x.domain(this.variables);
    this.y.domain(d3.extent(data, (d) => d.y));
    this.y.domain([0, d3.max(data, function(d) { return d.y; })]);
    avgRGBs = [avgBlue, avgGreen, avgPink, avgGrey, avgRed, avgPurple, avgBrown, avgOrange, avgYellow]
    datalength = [blueData, greenData, pinkData, greyData, redData, purpleData, brownData, orangeData, yellowData]
    // let fillColors = []
    for (let i = 0; i < avgRGBs.length; i ++) {
      let element = [
        parseInt(avgRGBs[i][0] / datalength[i].length), 
        parseInt(avgRGBs[i][1] / datalength[i].length), 
        parseInt(avgRGBs[i][2] / datalength[i].length)
      ]
      fillColors.push(element)
    }
    console.log(fillColors)
  }

  path(data){
    this.formatData(data);
    // console.log(parseInt(avgRed[0] / redData.length), avgBlue, avgYellow)
    let bars = []
    let that = this
    data.forEach((element, i) => {
      console.log(element, that.x(element.x), that.y(element.y))
      bars.push(
        <React.Fragment>
          <rect 
            height={that.height - that.y(element.y)} 
            width={that.bandwidth}
            x={that.x(element.x) + that.bandwidth * 0.4}
            y={that.y(element.y)}
            style={{"fill": "rgb(" + fillColors[i][0] + "," + 
                                     fillColors[i][1] + "," +  
                                     fillColors[i][2] + ")"}}
            onClick={() => that.onClick(that.variables2[i])}
          />
        </React.Fragment>
      )
    })
    return bars
  }

  gotData2 = (results) => {
    let data = results.val();
    let keys = Object.keys(data);
    for (let key of keys) {
      let record = data[key];
      this.colorByLabel[record.label].push(record);
      switch(record.label) {
        case 'blue-ish':
          blueData.push(record)
          avgBlue[0] = avgBlue[0] + parseInt(record.r)
          avgBlue[1] = avgBlue[1] + parseInt(record.g)
          avgBlue[2] = avgBlue[2] + parseInt(record.b)

          break;

        case 'green-ish':
          greenData.push(record)
          avgGreen[0] = avgGreen[0] + parseInt(record.r)
          avgGreen[1] = avgGreen[1] + parseInt(record.g)
          avgGreen[2] = avgGreen[2] + parseInt(record.b)
          break;

        case 'pink-ish':
          pinkData.push(record)
          avgPink[0] = avgPink[0] + parseInt(record.r)
          avgPink[1] = avgPink[1] + parseInt(record.g)
          avgPink[2] = avgPink[2] + parseInt(record.b)
          break;
        
        case 'grey-ish':
          greyData.push(record)
          avgGrey[0] = avgGrey[0] + parseInt(record.r)
          avgGrey[1] = avgGrey[1] + parseInt(record.g)
          avgGrey[2] = avgGrey[2] + parseInt(record.b)
          break;
        
        case 'red-ish':
          redData.push(record)
          avgRed[0] = avgRed[0] + parseInt(record.r)
          avgRed[1] = avgRed[1] + parseInt(record.g)
          avgRed[2] = avgRed[2] + parseInt(record.b)
          break;
        
        case 'purple-ish':
          purpleData.push(record)
          avgPurple[0] = avgPurple[0] + parseInt(record.r)
          avgPurple[1] = avgPurple[1] + parseInt(record.g)
          avgPurple[2] = avgPurple[2] + parseInt(record.b)
          break;
        
        case 'brown-ish':
          brownData.push(record)
          avgBrown[0] = avgBrown[0] + parseInt(record.r)
          avgBrown[1] = avgBrown[1] + parseInt(record.g)
          avgBrown[2] = avgBrown[2] + parseInt(record.b)
          break;
        
        case 'orange-ish':
          orangeData.push(record)
          avgOrange[0] = avgOrange[0] + parseInt(record.r)
          avgOrange[1] = avgOrange[1] + parseInt(record.g)
          avgOrange[2] = avgOrange[2] + parseInt(record.b)
          break;

        case 'yellow-ish':
          yellowData.push(record)
          avgYellow[0] = avgYellow[0] + parseInt(record.r)
          avgYellow[1] = avgYellow[1] + parseInt(record.g)
          avgYellow[2] = avgYellow[2] + parseInt(record.b)
          break;
      }
      this.allData.entries.push(record);
      
    }
    this.setState({
      loaded: true
    })
    this.drawXAxis();
    this.drawYAxis();
  }


  render() {
    let element = document.getElementsByTagName("canvas")
    if (element.length !== 0){
      for (let index = 0; index < element.length; index++) {
        element[index].parentNode.removeChild(element[index]);
      }
    }
    if (this.state.loaded) { 
      return (
        <React.Fragment>
            <Nav2/>
            <p style={{"text-align":"center"}}>Color labels by Distribution</p>
            <svg width={this.width + this.margin.left + this.margin.right} 
                 height={this.height + this.margin.top + this.margin.bottom}>
              
              <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
                {this.path([{x:'blue', y:blueData.length}, 
                            {x:'green', y:greenData.length},
                            {x:'pink', y:pinkData.length},
                            {x:'grey', y:greyData.length},
                            {x:'red', y:redData.length},
                            {x:'purple', y:purpleData.length}, 
                            {x:'brown', y:brownData.length}, 
                            {x:'orange', y:orangeData.length}, 
                            {x:'yellow', y:yellowData.length}])}
                <g ref='xaxis' className="x axis" style={{"font": "1.0em"}}
                   transform={`translate(0, ${this.height})`}>
                </g>
                <g ref='yaxis' className="y axis" style={{"font": "1.0em"}}>
                </g>
              </g>
            </svg>
          <Displaycanvas2 selectedColor = {this.state.selectedColor}/>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Nav2/>
          Loading...
        </React.Fragment>
      )
    }
    
  } 
}
export default Visualization; 