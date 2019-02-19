import React, { Component } from 'react';
import Firebase from './Firebase.js';
import { Button } from 'reactstrap';

class Buttons extends Component {
    constructor(props) {
        super(props);
        this.sendData = this.sendData.bind(this);
        console.log(this.props.generateColor);
    }
    
    
    sendData = () => {
        let colorDatabase = Firebase.database().ref('colors2');
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
        return (
            <React.Fragment>
                <Button onClick={this.sendData}>{this.props.button}</Button>{' '}
            </React.Fragment>
            
        )
    }
}

export default Buttons;