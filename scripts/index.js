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
firebase.analytics();
const auth = firebase.auth();

$(document).ready(function () {
    $("#regi").on("click", function () {
        const email = $("#regi-email").val().trim();
        const pass = $("#regi-password").val().trim();
        auth.createUserWithEmailAndPassword(email, pass).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + "  " + errorMessage)
        });
    });
    $("#log").on("click", function () {
        const email = $("#login-email").val().trim();
        const pass = $("#login-password").val().trim();
        firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + "  " + errorMessage)
        });
    });
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var email = user.email;
        console.log(email)
    } else {
        // User is signed out.
        // ...
    }
});
