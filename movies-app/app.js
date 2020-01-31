const express = require("express");
const app = express();
const hbs = require("hbs");
const moviesJSON = require("./movies.json");

app.set("view engine", "hbs");
app.use(express.static("public"));

hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (request, response) => {
  response.render("movies.hbs", {
    moviesList: moviesJSON
  });
});

app.get("/shawshank-redemption", (request, response) => {
  response.render("movie.hbs", moviesJSON[0]);
});

app.listen(5555);
