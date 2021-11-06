// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC4wdUA_Tgc9ufjNBe0Eu7cqYgIC1l8rHI",
  authDomain: "fir-9a3e7.firebaseapp.com",
  projectId: "fir-9a3e7",
  storageBucket: "fir-9a3e7.appspot.com",
  messagingSenderId: "512827818127",
  appId: "1:512827818127:web:8eec89ee3250745e3b30fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
