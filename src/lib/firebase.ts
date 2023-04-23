import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FB_APIKEY,
  authDomain: process.env.FB_AUTHDOMAIN,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
