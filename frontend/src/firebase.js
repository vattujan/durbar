import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var adminConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_ADMIN_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_ADMIN_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_ADMIN_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_ADMIN_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_ADMIN_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_ADMIN_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_FIREBASE_ADMIN_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_ADMIN_MEASUREMENTID
};

var schoolConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_ADMIN_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_ADMIN_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_ADMIN_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_ADMIN_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_ADMIN_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_ADMIN_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_FIREBASE_ADMIN_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_SCHOOL_MEASUREMENTID
};
// Initialize Firebase
firebase.initializeApp(adminConfig);
var secondary = firebase.initializeApp(schoolConfig, "school");

export { secondary };
export default firebase;