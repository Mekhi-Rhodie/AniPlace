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
  const db = firebase.firestore();
  const auth = firebase.auth();

$(document).ready(function(){
    $("#logout").on("click", function(){
        firebase.auth().signOut().then(function() {
            window.location.replace("index.html")
          }).catch(function(error) {
            // An error happened.
          });
    });
    $("#submit").on("click", function(){
      event.preventDefault();
      const genre = $("#genre-choice").val().trim() || null; 
      const status = $("#status-choice").val().trim() || null;
      const rating = $("#rating-choice").val().trim() || null;
      const media = $("#media-choice").val().trim() || null;
      const score = $("#score").val().trim() || null;
      const year = $("#year").val().trim() || null;
      console.log(`${genre} + ${status} + ${rating} + ${media} + ${score} + ${year}`)
      const url = 
      "https://api.jikan.moe/v3/search/anime?q=genre=" + genre + "&status=" + status + "&rated=" + rating + "&type="
      + media + "&score=" + score + "&start_date=" + year + "&limit=9"
      $.ajax({
        url: url,
        type: "GET"
      }).then(function(response){
        console.log(response)
      });
    });
    $("#search").on("click",function(){
      const anime = $("#anime").val().trim();
      const url = "https://api.jikan.moe/v3/search/anime?q="+ anime + "&limit=9"
      $.ajax({
        url: url,
        type: "GET"
      }).then(function(response){
        console.log(response)
      })
    })
});