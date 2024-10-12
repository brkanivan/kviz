import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCRCS3q7cwY6HvMREiZsGV8LxM3FG6JqwQ",
  authDomain: "kviz-41dcb.firebaseapp.com",
  projectId: "kviz-41dcb",
  storageBucket: "kviz-41dcb.appspot.com",
  messagingSenderId: "92143509544",
  appId: "1:92143509544:web:08e8d9e4237a5271a1951d"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db };
