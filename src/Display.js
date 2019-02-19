
import React, { Component } from 'react';
import Firebase from './Firebase.js';


const rect_x = 50;
const width = rect_x * 30;
let colorByLabel = {
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
var allData = {
    entries: []
}

function gotData(results) {
    let data = results.val();
    console.log(data);
    // process data
    let keys = Object.keys(data);
    // // console.log(keys.length);

    for (let key of keys) {
        let record = data[key];
        colorByLabel[record.label].push(record);
        allData.entries.push(record);
    }
    let x_pos = []
    let y_pos = []
    let color_labels = []
    // console.log(x_pos)
    let y_init = 0
    for (let key in colorByLabel) {
        color_labels.push(key)
        y_init = y_init + rect_x;
        x_pos.push(rect_x)
        y_pos.push(y_init)
    }
    console.log(allData)
}

function downloadData() {
    saveJSON(allData, 'colorData.json');
    console.log("downloading")
}


export function Display (p) {
    var rotation = 0;
    p.setup = function () {
      p.createCanvas(width, width);
    };
    let colorDatabase = Firebase.database().ref('colors');
    colorDatabase.once('value', gotData);
    
    p.draw = function () {
      p.background(0);
      p.noStroke();
      p.push();
      p.rotateY(rotation);
      p.box(100);
      p.pop();
    }
};