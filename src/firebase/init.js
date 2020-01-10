import firebase from 'firebase'
import firestore from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyATUf8IwtdGS9SBOuGISRd_p6u15nGKDYw",
  authDomain: "smoothies-ordering.firebaseapp.com",
  databaseURL: "https://smoothies-ordering.firebaseio.com",
  projectId: "smoothies-ordering",
  storageBucket: "smoothies-ordering.appspot.com",
  messagingSenderId: "238289846093",
  appId: "1:238289846093:web:2d5d03f1602a014f420104"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);


export default firebaseApp.firestore();
