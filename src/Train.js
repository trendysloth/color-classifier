import React, { Component } from 'react';
import Firebase from './Firebase.js';
import p5 from 'p5';
import Nav from './Nav.js'
import * as tf from '@tensorflow/tfjs';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
import { Container, Row, Col } from 'reactstrap';

var num = Math.round(0xffffff * Math.random());
var r = num >> 16;
var g = num >> 8 & 255;
var b = num & 255;
let model;
class Train extends Component {
    constructor(props) {
        super(props)
        this.allData = this.props.allData
        this.labelList = [
            'blue-ish',
            'green-ish',
            'pink-ish',
            'grey-ish',
            'red-ish',
            'purple-ish',
            'brown-ish',
            'orange-ish', 
            'yellow-ish'
        ]
        this.data = []
        this.train = this.train.bind(this);
        this.downloadData = this.downloadData.bind(this);
        this.state = {
            value: '',
            numEpoch: 0,
            data: [],
            loss: 0,
            colors: [r, g, b],
            prediction: ''
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        console.log(this.allData)
    }

    
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        let that = this
        event.preventDefault();
        if (this.state.value == '') {
            alert('input a value')
        }
        let numEpoch = parseInt(this.state.value)

        console.log(numEpoch)
        this.setState({
            numEpoch: numEpoch
        }, () => {
            that.train()
        });
      
    }
  
    removeTodo(item) {
      let todoList = this.state.todoList
      todoList = todoList.filter(function(value, index, arr){
  
        return value !== item;
    
      });
    
      this.setState({
        todoList: todoList
      });
    }


    train = () => {
        let numEpoch = this.state.numEpoch
        // document.getElementById('epochNum').value= numEpoch;
        let xs, ys;
        let colors = []
        let labels = []
        model = tf.sequential();
        // console.log(this.allData)
        for (let record of this.allData.entries) {
            console.log(record.label)
            let col = [record.r / 255, record.g / 255, record.b / 255];
            colors.push(col);
            labels.push(this.labelList.indexOf(record.label));
        }
        console.log(colors, labels)
    
    
        // getting the Xs
        xs = tf.tensor2d(colors);
        
        let labelsTensor = tf.tensor1d(labels, 'int32');
        labelsTensor.print();
    
        // getting the Ys
        ys = tf.oneHot(labelsTensor, 9);
        labelsTensor.dispose();
    
        console.log(xs.shape, ys.shape);
        // xs.print();
        // ys.print();
    
        
        let hidden = tf.layers.dense({
            units: 16,
            activation: 'sigmoid',
            inputShape: [3]
        });
    
        let output = tf.layers.dense({
            units: 9,
            activation: 'softmax'
        })
    
        model.add(hidden);
        model.add(output);
    
        // console.log(model);
        // Create an optimizer
        const lr = 0.2;
        const optimizer = tf.train.sgd(lr);
    
        model.compile({
            optimizer: optimizer,
            loss: 'categoricalCrossentropy'
        });
    
        starttrain().then(results => {
          console.log(results.history.loss);
        });
    
    
        let that = this
        async function starttrain(){
          
          const options = {
              epochs: numEpoch,
              validationSplit: 0.1,
              shuffle: true,
              callbacks: {
                  onBatchEnd: tf.nextFrame,
                  onEpochEnd: (num, logs) => {
                      console.log('Epoch: ' + num);
                      console.log('Loss: ' + logs.val_loss);
                      // lossP.html(logs.loss);
                     
                    //   document.getElementById('Epoch').value= num;
                    //   document.getElementById('lossP').value= logs.val_loss.toFixed(3);

                      that.data.push({x: num, y:logs.val_loss})

                      that.setState({
                          data: that.data,
                          numEpoch: num,
                          loss: logs.val_loss.toFixed(3)

                      })
                  }
              }
          }
        
          return await model.fit(xs, ys, options);
        }
    }

    predict = () => {
        let that = this
        tf.tidy(() => {
            const xs = tf.tensor2d([
                [r / 255, g / 255, b / 255]
            ]);
            let results = model.predict(xs);
            let index = results.argMax(1).dataSync()[0];
            // console.log(index);
            let label = that.labelList[index];
            // labelP.html(label)
            // console.log(label);
            this.setState({
                prediction: label
            })
        })
    }


    downloadData = () => {
        // saveJSON(allData, 'colorData.json');
        console.log("downloading", this.allData);
        this.canvas2.saveJSON(this.allData, 'colorData.json');
    }

    generateCanvas = () => {
        this.canvas2 = new p5(this.sketch, this.refs.wrapper3)
        this.canvas2 = new p5(this.sketch2, this.refs.wrapper5)
    }

    sketch = (p) => {
        var rotation = 0;
        p.setup = function () {
            p.createCanvas(200, 200);
        };

        p.draw = function () {
            p.background(0);
            p.noStroke();
            // p.push();
            // p.rotateY(0);
            // p.box(100);
            // p.pop();
        }

    };

    sketch2 = (p) => {
        r = this.state.colors[0]
        g = this.state.colors[1]
        b = this.state.colors[2]
        p.setup = function () {
          p.createCanvas(100, 100);
        };
        p.draw = function () {
          p.background(r, g, b);
          p.noStroke();
          p.push();
          p.pop();
        }
        
        // rSlider.position(20, 20);
    };

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

    componentDidMount() {
        
        this.generateCanvas();
    }


    // remove canvas from data visualization page
    componentDidUnMount() {
        // this.removeCanvas();
    }

    render() {
        // console.log(this.props)

        // const data = [
        //     {x: 0, y: 8},
        //     {x: 1, y: 5},
        //     {x: 2, y: 4},
        //     {x: 3, y: 9},
        //     {x: 4, y: 1},
        //     {x: 5, y: 7},
        //     {x: 6, y: 6},
        //     {x: 7, y: 3},
        //     {x: 8, y: 2},
        //     {x: 9, y: 0}
        // ];
        console.log(this.data)
        return(
            // <Container>
            //     <Row>
            //         {/* <Col sm="3">
                        
            //         </Col> */}
            //         <
            //     </Row>
            // </Container>
            <React.Fragment>
                {/* <Col xs="3"></Col> */}
                <Col>
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input onChange={this.handleChange} placeholder="Number of Epoches" />
                        </FormGroup>
                        {'   '}
                        <Button color="primary">Start training</Button>
                        <Button onClick={this.downloadData}>Download Data</Button>
                    </Form>
                    
                    <p>epoch: {this.state.numEpoch + 1}  loss: {this.state.loss}</p>

                    <div className="App">
                        <XYPlot height={300} width={window.innerWidth * 0.4}>
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis />
                            <YAxis />
                            <LineSeries data={this.state.data} />
                        </XYPlot>
                    </div>
                    <div id="wrapper3"/>
                </Col>
                <Col xs="6">
                    
                    <Button color="primary" onClick={this.generateColor}>generate color</Button>{'   '}
                    <Button color="primary" onClick={this.predict}>predict</Button>
                </Col>
                <Col xs="6">
                    <div ref="wrapper5"/>
                    <p>{this.state.prediction}</p>
                </Col>
                    
                    

                

                    
            </React.Fragment>
            
            
        )
        
    }

}
export default Train;