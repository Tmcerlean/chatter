import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCEL9vHwUJiCfL5lsenVF-ql0WHtDZJP8I",
    authDomain: "chatter-8528a.firebaseapp.com",
    projectId: "chatter-8528a",
    storageBucket: "chatter-8528a.appspot.com",
    messagingSenderId: "700802468387",
    appId: "1:700802468387:web:e38625bd190139460c3f96"
};
  
firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;