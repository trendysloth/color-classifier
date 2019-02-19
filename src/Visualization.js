import React, { Component } from 'react';
import Firebase from './Firebase.js';
import Nav from './Nav.js';
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
    // this.generateCanvas = this.generateCanvas.bind(this);
    this.gotData2 = this.gotData2.bind(this);
    this.state = {
      loaded: false
    }
  
  }

  componentDidMount() {
    let that = this
    async function asyncCall() {
        let colorDatabase = Firebase.database().ref('colors2');
        await colorDatabase.once('value', that.gotData2);
    }
    
    asyncCall();
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
          // avgBlue[0] = avgBlue[0] + parseInt(record.r)
          // avgBlue[1] = avgBlue[1] + parseInt(record.g)
          // avgBlue[2] = avgBlue[2] + parseInt(record.b)

          break;

        case 'green-ish':
          greenData.push(record)
          // avgGreen[0] = avgGreen[0] + parseInt(record.r)
          // avgGreen[1] = avgGreen[1] + parseInt(record.g)
          // avgGreen[2] = avgGreen[2] + parseInt(record.b)
          break;

        case 'pink-ish':
          pinkData.push(record)
          // avgPink[0] = avgPink[0] + parseInt(record.r)
          // avgPink[1] = avgPink[1] + parseInt(record.g)
          // avgPink[2] = avgPink[2] + parseInt(record.b)
          break;
        
        case 'grey-ish':
          greyData.push(record)
          // avgGrey[0] = avgGrey[0] + parseInt(record.r)
          // avgGrey[1] = avgGrey[1] + parseInt(record.g)
          // avgGrey[2] = avgGrey[2] + parseInt(record.b)
          break;
        
        case 'red-ish':
          redData.push(record)
          // avgRed[0] = avgRed[0] + parseInt(record.r)
          // avgRed[1] = avgRed[1] + parseInt(record.g)
          // avgRed[2] = avgRed[2] + parseInt(record.b)
          break;
        
        case 'purple-ish':
          purpleData.push(record)
          // avgPurple[0] = avgPurple[0] + parseInt(record.r)
          // avgPurple[1] = avgPurple[1] + parseInt(record.g)
          // avgPurple[2] = avgPurple[2] + parseInt(record.b)
          break;
        
        case 'brown-ish':
          brownData.push(record)
          // avgBrown[0] = avgBrown[0] + parseInt(record.r)
          // avgBrown[1] = avgBrown[1] + parseInt(record.g)
          // avgBrown[2] = avgBrown[2] + parseInt(record.b)
          break;
        
        case 'orange-ish':
          orangeData.push(record)
          // avgOrange[0] = avgOrange[0] + parseInt(record.r)
          // avgOrange[1] = avgOrange[1] + parseInt(record.g)
          // avgOrange[2] = avgOrange[2] + parseInt(record.b)
          break;

        case 'yellow-ish':
          yellowData.push(record)
          // avgYellow[0] = avgYellow[0] + parseInt(record.r)
          // avgYellow[1] = avgYellow[1] + parseInt(record.g)
          // avgYellow[2] = avgYellow[2] + parseInt(record.b)
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



    // let avgGrey_r = avgGrey[0] / greyData.length
    // let avgGrey_g = avgGrey[1] / greyData.length
    // let avgGrey_b = avgGrey[2] / greyData.length
    if (this.state.loaded) { 
      return (
        <React.Fragment>
            <Nav/>
            <h3>data distribution by color labels</h3> 
            <XYPlot xType="ordinal" width={window.innerWidth} height={300}>
              {/* <VerticalGridLines /> */}
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              <VerticalBarSeries data={[{x:'blue', y:blueData.length}, 
                                        {x:'green', y:greenData.length},
                                        {x:'pink', y:pinkData.length},
                                        {x:'grey', y:greyData.length},
                                        {x:'purple', y:purpleData.length}, 
                                        {x:'brown', y:brownData.length}, 
                                        {x:'orange', y:orangeData.length}, 
                                        {x:'yellow', y:yellowData.length}]}/>
                                
                                 
              {/* <VerticalBarSeries data={[]}/>  */}
              {/* <VerticalBarSeries data={[]}/> 

              <VerticalBarSeries data={[]}
                                 color={"rgb(" + avgGrey_r + "," + avgGrey_g + "," + avgGrey_b + ")"}/>

              <VerticalBarSeries data={[]}/> 
              <VerticalBarSeries data={[]}/> 
              <VerticalBarSeries data={[]}/> 
              <VerticalBarSeries data={[]}/> 
                                     */}
            </XYPlot>



            <XYPlot xType="ordinal" width={window.innerWidth} height={300}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis />

            </XYPlot>
            
              
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