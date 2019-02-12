import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyAoUTF0F09_aSFS9U1wzA8eyK1JF3Sw7LQ",
    authDomain: "colorclassification-5d716.firebaseapp.com",
    databaseURL: "https://colorclassification-5d716.firebaseio.com",
    projectId: "colorclassification-5d716",
    storageBucket: "colorclassification-5d716.appspot.com",
    messagingSenderId: "622325471999"
};
let Firebase = firebase.initializeApp(config);
export default Firebase;