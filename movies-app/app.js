const express = require("express");
const app = express();
const hbs = require("hbs");
const moviesJSON = require("./movies.json");

app.set("view engine", "hbs");
app.use(express.static("public"));

hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (request, response) => {
  console.log("/");
  response.render("index.hbs");
});

app.get("/movies", (request, response) => {
  console.log("/movies");
  response.render("movies.hbs", {
    moviesList: moviesJSON
  });
});

// app.get("/shawshank-redemption", (request, response) => {
//   response.render("movie.hbs", moviesJSON[0]);
// });

app.get("/movies/:movieId", (request, response) => {
  console.log("request.params: ", request.params);

  // let movie;

  // moviesJSON.forEach(el => {
  //   if (el.imdbID === request.params.movieId) {
  //     movie = el;
  //   }
  // });

  const movieId = request.params.movieId;

  const movie = moviesJSON.find(el => {
    if (el.imdbID === movieId) {
      return true;
    }
  });

  response.render("movie.hbs", movie);
});

app.listen(5555);
