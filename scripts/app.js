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

var shows = [];
var showImage = [];

class Anime {
  constructor(title, episodes, status, rated, score, type, summary, year, pic) {
    this.title = title,
      this.episodes = episodes,
      this.status = status,
      this.rated = rated,
      this.score = score,
      this.type = type,
      this.summary = summary,
      this.year = year,
      this.pic = pic
  };
};

$(document).ready(function () {
  $("#logout").on("click", function () {
    firebase.auth().signOut().then(function () {
      window.location.replace("index.html")
    }).catch(function (error) {
      // An error happened.
    });
  });
  $("#submit").on("click", function () {
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
    }).then(function (response) {
      iterateData(response);
    });
  });
  $("#search").on("click", function () {
    const anime = $("#anime").val().trim();
    const url = "https://api.jikan.moe/v3/search/anime?q=" + anime + "&limit=9"
    $.ajax({
      url: url,
      type: "GET"
    }).then(function (response) {
      iterateData(response);
    });

  });
  $(document).on("click", ".ani-pic", function () {
    const imgURL = $(this).attr("src")
    const currentImg = shows.filter((cur) =>
      cur.pic === imgURL
    );
    const { title, episodes, status, rated, score, type, summary, year, pic } = currentImg[0];
    $("#anime-result").append(
      "<div class='anime-data'>" +
      "<h1>" + title + "</h1>" +
      "<p>" + summary + "</p>" +
      "<div class='data-item'>" +
      "<h3 class='label'>Episodes: </h3>" + `${episodes}`
      + "</div>" +
      "<div class='data-item'>" +
      "<h3 class='label'>Year:</h3>" + "  " + `<p>${year}</p>`
      + "</div>" +
      "<div class='data-item'>" +
      "<h3 class='label'>Rated:</h3>" + "  " + `<p>${rated}</p>`
      + "</div>" +
      "<div class='data-item'>" +
      "<h3 class='label'>Score:</h3>" + "  " + `<p>${score}</p>`
      + "</div>" +
      "<div class='data-item'>" +
      "<h3 class='label'>Status:</h3>" + "  " + `<p>${status}</p>`
      + "</div>" +
      "<div class='data-item'>" +
      "<h3 class='label'>Type:</h3>" + "  " + `<p>${type}</p>`
      + "</div>" +
      "<form>" +
      "<button class='add btn' type='button'>Add</button>" +
      "<button class='close btn' type='button'>Close</button>"
      + "</form>"
      + "</div>"
    );
  });
});

function iterateData(response) {
  let data = response.results
  for (let i = 0; i < data.length; i++) {
    //console.log(data[i])
    let title = data[i].title;
    let episodes = data[i].episodes;
    let status = data[i].airing;
    let rated = data[i].rated;
    let score = data[i].score;
    let type = data[i].type;
    let summary = data[i].synopsis;
    let year = new Date(data[i].start_date).getFullYear();
    let pic = data[i].image_url;
    let currentAnime = new Anime(title, episodes, status, rated, score, type, summary, year, pic)
    shows.push(currentAnime)
    $("#anime-result").append(
      "<div class='anime'>" +
      `<img class='ani-pic' src='${currentAnime.pic}'>` +
      `<p>${currentAnime.title}</p>`
      + "</div>"
    );
  };
};


