import React, { Component } from 'react';
import Firebase from './Firebase.js';
import Nav from './Nav.js';
import * as d3 from 'd3';
import Displaycanvas2 from './Displaycanvas2.js';
import { UncontrolledTooltip } from 'reactstrap';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries } from 'react-vis';

import { Button } from 'reactstrap';

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
    // this.selectedColor = '';
  }


  onClick(color) {
    // console.log(element)
    this.setState({
      selectedColor: color
    }, console.log(color))
    // this.selectedColor = color;
    // console.log(this.selectedColor);
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
    console.log('drawing xaxis...', this.x, this.y)

    // let x2 = d3.scaleBand().range([0, 400]).domain(['red']);
    // let x2.domain(this.variables);

    return d3.axisBottom(this.x).ticks(9);


    // console.log(x2)
    // return d3.axisBottom(x2).ticks(9);
  }

  get yAxis(){
    var format = d3.format(".2s");
    return d3.axisLeft(this.y)
             .ticks(5)
             .tickFormat(function(d) {
                return format(d)
             });

    // return d3.axisLeft(this.y);
  }

  drawXAxis = (e) =>{
    console.log("event", this.refs.xaxis);
    d3.select(this.refs.xaxis).call(this.xAxis);
  }


  drawYAxis(){
    d3.select(this.refs.yaxis).call(this.yAxis);
  }

  // get line(){
  //   return d3.line().x((d)=> (this.x(d.x)))
  //                   .y((d)=> (this.y(d.y)));
  //                   // .height((d) => (this.y(d.y)))
  //                   // .width((d) => this.x.bandwidth())
  // }

  formatData(data) {
    this.x.domain(this.variables);
    this.y.domain(d3.extent(data, (d) => d.y));
    this.y.domain([0, d3.max(data, function(d) { return d.y; })]);

    // console.log(this.x.domain(), data)

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
    console.log(parseInt(avgRed[0] / redData.length), avgBlue, avgYellow)
    
    // return (
    //   <path d={this.line(data)} style={{"stroke": "#1f78b4", "stroke-width": "5px"}}/>
    // );
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
          {/* <text x={that.x(element.x)} y={that.y(-15)}>
            {element.x}
          </text> */}
          {/* <text x={that.x(element.x)} y={that.y(element.y)} font={"1.0em"}>
            {element.y}
          </text> */}
          {/* <UncontrolledTooltip placement="top" target={"rect-id-" + i}> */}
            {/* x: {this.variables[0]} <br/> y: {contribution_breakdown_list[0].toFixed(2)} */}
            {/* haha */}
          {/* </UncontrolledTooltip> */}
        </React.Fragment>
      )
    })
    return bars
  }

  gotData2 = (results) => {
    
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


      switch(record.label) {
        case 'blue-ish':
          blueData.push(record)
          // console.log(record.r, record.g, record.b)
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
    // console.log(avgBlue[0], blueData.length)
    this.setState({
      loaded: true
    })
  }


  render() {
    let element = document.getElementsByTagName("canvas")
    if (element.length !== 0){
      for (let index = 0; index < element.length; index++) {
        element[index].parentNode.removeChild(element[index]);
      }
    }
    
    // console.log(avgBlue[0] / blueData.length, avgBlue[1] / blueData.length, avgBlue[2] / blueData.length)

    // let avgBlue_r = avgBlue[0] / blueData.length
    // let avgBlue_g = avgBlue[1] / blueData.length
    // let avgBlue_b = avgBlue[2] / blueData.length


    // d3.select(this).style("font-size","30px");
    // let avgGrey_r = avgGrey[0] / greyData.length
    // let avgGrey_g = avgGrey[1] / greyData.length
    // let avgGrey_b = avgGrey[2] / greyData.length
    if (this.state.loaded) { 
      // console.log(this.)
      // this.drawXAxis();
      return (
        <React.Fragment>
            <Nav/>
            {/* <h3>data distribution by color labels</h3>  */}
            {/* <XYPlot xType="ordinal" width={window.innerWidth} height={300}>
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              <VerticalBarSeries data={[{x:'blue', y:blueData.length}, 
                                        {x:'green', y:greenData.length},
                                        {x:'pink', y:pinkData.length},
                                        {x:'grey', y:greyData.length},
                                        {x:'red', y:redData.length},
                                        {x:'purple', y:purpleData.length}, 
                                        {x:'brown', y:brownData.length}, 
                                        {x:'orange', y:orangeData.length}, 
                                        {x:'yellow', y:yellowData.length}]}/>
            </XYPlot> */}
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
                   transform={`translate(0, ${this.height})`} onLoad={this.drawXAxis()}>
                    {this.drawXAxis()}
                    {/* {d3.axisBottom(this.x).ticks(9)} */}
                </g>
                <g ref='yaxis' className="y axis" style={{"font": "1.0em"}}>
                    {this.drawYAxis()}
                </g>
              </g>
            </svg>

            
          <Displaycanvas2 selectedColor = {this.state.selectedColor}/>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Nav/>
          Loading...
        </React.Fragment>
      )
    }
    
  } 
}
export default Visualization; 