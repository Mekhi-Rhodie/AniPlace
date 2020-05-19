var firebaseConfig = {
    apiKey: "AIzaSyA3VBLS-AA0Oso13lU74kR17oKZbN1CyFg",
    authDomain: "aniplace-61053.firebaseapp.com",
    databaseURL: "https://aniplace-61053.firebaseio.com",
    projectId: "aniplace-61053",
    storageBucket: "aniplace-61053.appspot.com",
    messagingSenderId: "806769363986",
    appId: "1:806769363986:web:d2b38b25339e7624eadccb",
    measurementId: "G-XZF5R01FLY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.analytics();
  const db = firebase.firestore();