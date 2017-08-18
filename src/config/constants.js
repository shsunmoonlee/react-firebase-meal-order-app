// import firebase from 'firebase'
// import Rebase from 're-base';
//
// export var app = firebase.initializeApp({
//   apiKey: "AIzaSyBgEenFiRScC1TO0agFW2fajRd0K8az_Rg",
//   authDomain: "react-firebase-meal-ordering.firebaseapp.com",
//   databaseURL: "https://react-firebase-meal-ordering.firebaseio.com",
//   projectId: "react-firebase-meal-ordering",
//   storageBucket: "react-firebase-meal-ordering.appspot.com",
//   messagingSenderId: "901761605399"
// });
// export var base = Rebase.createClass(app.database());
//
// export const ref = app.database().ref()
// export const firebaseAuth = app.auth


// Original
import firebase from 'firebase'
import Rebase from 're-base';

const config = {
  apiKey: "AIzaSyBgEenFiRScC1TO0agFW2fajRd0K8az_Rg",
  authDomain: "react-firebase-meal-ordering.firebaseapp.com",
  databaseURL: "https://react-firebase-meal-ordering.firebaseio.com",
  projectId: "react-firebase-meal-ordering",
  storageBucket: "react-firebase-meal-ordering.appspot.com",
  messagingSenderId: "901761605399"
}

export const firebaseApp = firebase.initializeApp(config);
export const base = Rebase.createClass(config);
export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth


// import firebase from 'firebase/app';
// import database from 'firebase/database';
// import Rebase from 're-base';
// //
// const config = {
//   apiKey: "AIzaSyBgEenFiRScC1TO0agFW2fajRd0K8az_Rg",
//   authDomain: "react-firebase-meal-ordering.firebaseapp.com",
//   databaseURL: "https://react-firebase-meal-ordering.firebaseio.com",
//   projectId: "react-firebase-meal-ordering",
//   storageBucket: "react-firebase-meal-ordering.appspot.com",
//   messagingSenderId: "901761605399"
// }
// //
// export const firebaseApp = firebase.initializeApp(config);
// export const base = Rebase.createClass(database(firebaseApp))
// export const ref = firebase.database().ref()
// export const firebaseAuth = firebase.auth


// import firebase from 'firebase'
// import Rebase from 're-base';
//
// export const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyBgEenFiRScC1TO0agFW2fajRd0K8az_Rg",
//   authDomain: "react-firebase-meal-ordering.firebaseapp.com",
//   databaseURL: "https://react-firebase-meal-ordering.firebaseio.com",
//   projectId: "react-firebase-meal-ordering",
//   storageBucket: "react-firebase-meal-ordering.appspot.com",
//   messagingSenderId: "901761605399"
// });
//
// export const base = Rebase.createClass(firebaseApp.database());
// export const ref = firebaseApp.database().ref()
// export const firebaseAuth = firebaseApp.auth
