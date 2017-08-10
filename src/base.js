import Rebase from 're-base';
import firebase from 'firebase';

const base = Rebase.createClass({
  apiKey: "AIzaSyBgEenFiRScC1TO0agFW2fajRd0K8az_Rg",
  authDomain: "react-firebase-meal-ordering.firebaseapp.com",
  databaseURL: "https://react-firebase-meal-ordering.firebaseio.com",
  projectId: "react-firebase-meal-ordering",
  storageBucket: "react-firebase-meal-ordering.appspot.com",
  messagingSenderId: "901761605399"
});

export default base;

export var app = firebase.initializeApp({
  apiKey: "AIzaSyBgEenFiRScC1TO0agFW2fajRd0K8az_Rg",
  authDomain: "react-firebase-meal-ordering.firebaseapp.com",
  databaseURL: "https://react-firebase-meal-ordering.firebaseio.com",
  projectId: "react-firebase-meal-ordering",
  storageBucket: "react-firebase-meal-ordering.appspot.com",
  messagingSenderId: "901761605399"
});

export const ref = app.database().ref()
export const firebaseAuth = app.auth
export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}
