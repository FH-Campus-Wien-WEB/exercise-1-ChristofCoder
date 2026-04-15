const express = require('express')
const path = require('path')
const app = express()
const lifeIsBeatutiful = {
  "Title": "Life Is Beautiful",
  "Released": "20 Dec 1997",
  "Runtime": "116 min",
  "Genre": "Comedy, Drama, Romance",
  "Director": "Roberto Benigni",
  "Writer": "Vincenzo Cerami, Roberto Benigni",
  "Actors": "Roberto Benigni, Nicoletta Braschi, Giorgio Cantarini",
  "Plot": "When an open-minded Jewish waiter and his son become victims of the Holocaust, he uses a perfect mixture of will, humor and imagination to protect his son from the dangers around their camp.",
  "Poster": "https://m.media-amazon.com/images/M/MV5BZTBhOGYzZjQtYzE0Mi00MGIwLWE0MWYtNzMxNTM2OTFkM2NjXkEyXkFqcGc@._V1_SX300.jpg",
  "Metascore": "58",
  "imdbRating": "8.6"
};
const avatar = {
  "Title":"Avatar",
  "Released":"18 Dec 2009",
  "Runtime":"162 min",
  "Genre":"Action, Adventure, Fantasy",
  "Director":"James Cameron",
  "Writer":"James Cameron",
  "Actors":"Sam Worthington, Zoe Saldaña, Sigourney Weaver",
  "Plot":"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
  "Poster":"https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_SX300.jpg",
  "Metascore":"83",
  "imdbRating":"7.9"
}
const theThirdMan = {
  "Title":"The Third Man",
  "Released":"01 Feb 1950",
  "Runtime":"104 min",
  "Genre":"Drama, Film-Noir, Mystery",
  "Director":"Carol Reed",
  "Writer":"Graham Greene, Alexander Korda, Carol Reed",
  "Actors":"Orson Welles, Joseph Cotten, Alida Valli",
  "Plot":"Pulp novelist Holly Martins travels to shadowy, postwar Vienna, only to find himself investigating the mysterious death of an old friend, Harry Lime.",
  "Poster":"https://m.media-amazon.com/images/M/MV5BNGVjMTMxZTQtMmVlNy00YmI0LWJjMDUtYTgyZWU1Njg5ZGRiXkEyXkFqcGc@._V1_SX300.jpg",
  "Metascore":"97",
  "imdbRating":"8.1"
}

const rawMovies = [lifeIsBeatutiful, avatar, theThirdMan];

function transformMovieData(data) {
  // 1. Convert the "Released" date (e.g., "20 Dec 1997")
  // This creates a date object and turns it into "1997-12-20T..."
  let fullDate = new Date(data.Released).toISOString();
  // We only want the first 10 characters (the date part)
  let shortDate = fullDate.substring(0, 10);

  // 2. Convert "116 min" into just the number 116
  let minutes = parseInt(data.Runtime);

  // 3. Turn strings with commas into Lists (Arrays)
  let genreArray = data.Genre.split(", ");
  let directorArray = data.Director.split(", ");
  let writerArray = data.Writer.split(", ");
  let actorArray = data.Actors.split(", ");

  // 4. Convert scores from text "58" to actual number 58
  let score = parseInt(data.Metascore);
  let rating = parseFloat(data.imdbRating);

  // 5. Build the final clean version
  let result = {
    Title: data.Title,
    Released: shortDate,
    Runtime: minutes,
    Genres: genreArray,
    Directors: directorArray,
    Writers: writerArray,
    Actors: actorArray,
    Plot: data.Plot,
    Poster: data.Poster,
    Metascore: score,
    imdbRating: rating
  };

  return result;
}


const cleanMovieCollection = []; // Create an empty "box" to hold the clean movies

for (let i = 0; i < rawMovies.length; i++) {
  // 1. Get the "messy" movie at the current position (i)
  let rawMovie = rawMovies[i];

  // 2. Use your transformation function to clean it
  let cleanMovie = transformMovieData(rawMovie);

  // 3. Push the clean movie into our new array
  cleanMovieCollection.push(cleanMovie);
}

// This turns your live objects into one long JSON string
const jsonString = JSON.stringify(cleanMovieCollection, null, 2);

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for data..
app.get('/movies', function (req, res) {
  // Part 1: Remove the next line and replace with your code
  // You can find the variable declaration, logic, pre-processing above! 
  // res.json() tells the browser: "Hey, I'm sending a JSON array."
  res.json(cleanMovieCollection)
})

app.listen(5500)

console.log("Server now listening on http://localhost:5500/")
