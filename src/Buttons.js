import React, { Component } from 'react';
import Firebase from './Firebase.js';

class Button extends Component {
    constructor(props) {
        super(props);
    
        // This binding is necessary to make `this` work in the callback
        this.sendData = this.sendData.bind(this);
        console.log(this.props.generateColor);
    }
    
    
    sendData = () => {
        let colorDatabase = Firebase.database().ref('colors2');
        console.log(this.props)
    
        var data = {
            r: `${this.props.r}`,
            g: `${this.props.g}`,
            b: `${this.props.b}`,
            label: this.props.button
        }
        console.log('saving')
        console.log(data)
        let color = colorDatabase.push(data, finished);
        console.log("Firebase generated key: " + color.key);
        
        let that = this
        function finished(err) {
            
            if (err) {
                console.log("ooops, something went wrong");
                console.log("err");
            } else {
                console.log("Data saved successfully");
                that.props.generateColor();
            }
        }
        console.log('onclick')
    }
    render() {
        return (<button onClick={this.sendData}>{this.props.button}</button>)
    }
}

export default Button;