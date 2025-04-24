// firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABdkIQ8IpTYyCMmPCC9k1UUi_LRPRuNg8",
  authDomain: "ar-web-app-131ee.firebaseapp.com",
  projectId: "ar-web-app-131ee",
  storageBucket: "ar-web-app-131ee.firebasestorage.app",
  messagingSenderId: "328189715889",
  appId: "1:328189715889:web:6f2dd4da82dd7b72e24990",
  measurementId: "G-R9TVF34DH1",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

console.log(`Firebase initialized ${app}!`)
console.log(`Database initliazed ${db}!`)

export { app, db }
