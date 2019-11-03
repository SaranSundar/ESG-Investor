import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKBIwgNpwViOyPlZd9UgjCDAuh1AslVPU",
    authDomain: "egsinvestor-56d03.firebaseapp.com",
    databaseURL: "https://egsinvestor-56d03.firebaseio.com",
    projectId: "egsinvestor-56d03",
    storageBucket: "egsinvestor-56d03.appspot.com",
    messagingSenderId: "343874941714",
    appId: "1:343874941714:web:ed348ce5140016779a79cb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export {firebase}