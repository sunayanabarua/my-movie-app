const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');
// const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

let nowPlayingData, respUpcomingData, popularData, topRatedData;

const api_key = "d48ab50b72d58d687d7e7604dd875c0b";
const nowPlayingUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + api_key + "&language=en-US&page=1";
const upcomingUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + api_key + "&language=en-US&page=1";
const popularUrl = "https://api.themoviedb.org/3/movie/popular?api_key="+ api_key +"&language=en-US&page=1";
const topRatedUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + api_key + "&language=en-US&page=1";

function getresponse() {
  https.get(nowPlayingUrl, function(response) {
    var data;
    response.on("data", function(chunk) {
      if (!data) {
        data = chunk;
      } else {
        data += chunk;
      }
    });
    response.on("end", function() {
      nowPlayingData = JSON.parse(data);
    });
  });

  https.get(upcomingUrl, function(response) {
    var data;
    response.on("data", function(chunk) {
      if (!data) {
        data = chunk;
      } else {
        data += chunk;
      }
    });
    response.on("end", function() {
      respUpcomingData = JSON.parse(data);
    });
  });

  https.get(popularUrl, function(response) {
    var data;
    response.on("data", function(chunk) {
      if (!data) {
        data = chunk;
      } else {
        data += chunk;
      }
    });
    response.on("end", function() {
      popularData = JSON.parse(data);
      // return respPlayingData;
    });
  })

  https.get(topRatedUrl, function(response) {
    var data;
    response.on("data", function(chunk) {
      if (!data) {
        data = chunk;
      } else {
        data += chunk;
      }
    });
    response.on("end", function() {
      topRatedData = JSON.parse(data);
      // return respPlayingData;
    });
  })
}

getresponse();

app.get("/", function(req, res) {
  res.render("index", {
    nowPlayingList: nowPlayingData,
    upcomingList: respUpcomingData,
    popularList: popularData,
    topRatedList: topRatedData
  });
});


app.post("/", function(req, res) {
  const api_key = "d48ab50b72d58d687d7e7604dd875c0b";
  const query = req.body.searchInput;
  console.log(query);
  const searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&query=" + query;
  https.get(searchUrl, function(response) {
    var data;
    response.on("data", function(chunk) {
      if (!data) {
        data = chunk;
      } else {
        data += chunk;
      }
    });
    response.on("end", function() {
      const searchData = JSON.parse(data);
      res.render("movieLists", {
        movieList: searchData
      });
    });
  });
});

app.get("/movie/:movie_id", function(req, res) {
  const movie_id = req.params.movie_id;
  const movieDetailUrl = "https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=" + api_key + "&language=en-US"
  // console.log(movieDetailUrl);
  https.get(movieDetailUrl, function(response) {
    var data;
    response.on("data", function(chunk) {
      if (!data) {
        data = chunk;
      } else {
        data += chunk;
      }
    });
    response.on("end", function() {
      const movieDetail = JSON.parse(data);
      res.render("movieDetail", {
        movieDetail: movieDetail
      });
    });
  });
});

app.get("/genre/:params", function(req, res) {

})

app.listen(3000, function() {
  console.log("Server is started successfully at port 3000");
})









//API Key: d48ab50b72d58d687d7e7604dd875c0b
//Sample Request: https://api.themoviedb.org/3/movie/550?api_key=d48ab50b72d58d687d7e7604dd875c0b
