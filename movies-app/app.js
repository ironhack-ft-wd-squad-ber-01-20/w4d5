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

  // const { movieId } = request.params;

  const movieId = request.params.movieId;

  const movie = moviesJSON.find(el => {
    if (el.imdbID === movieId) {
      return true;
    }
  });

  response.render("movie.hbs", movie);
});

// /search?title=titanic&director=cameron

app.get("/search", (request, response) => {
  console.log("/search");
  console.log("request.query: ", request.query);

  // const filtered = moviesJSON.filter(el => {
  //   if (!request.query.title && !request.query.director) {
  //     return true;
  //   }

  //   if (
  //     request.query.title &&
  //     el.Title.toLowerCase().includes(request.query.title.toLowerCase())
  //   ) {
  //     return true;
  //   }
  //   if (
  //     request.query.director &&
  //     el.Director.toLowerCase().includes(request.query.director.toLowerCase())
  //   ) {
  //     return true;
  //   }
  // });

  const filtered = moviesJSON.filter(el => {
    if (el.Title.toLowerCase().includes(request.query.title.toLowerCase())) {
      return true;
    }
  });

  response.render("movies.hbs", {
    moviesList: filtered
  });
});

app.get("/searchByYear", (request, response) => {
  const filtered = moviesJSON.filter(el => {
    if (el.Year === request.query.year) {
      return true;
    }
  });

  console.log("request.query: ", request.query);
  response.render("movies.hbs", {
    moviesList: filtered
  });
});

app.listen(5555);
