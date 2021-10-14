const TMDB_BASE_URL = "https://api.themoviedb.org/3/";
const TMDB_IMAGE_API_BASE_URL = "https://image.tmdb.org/t/p/original";
const TMDB_API_KEY = "57db82bc0de6cdceb2fd80b8ab052215";

$(document).ready(function() {});

function GetMostPopularMovies(callbackFunction) {
    // https://developers.themoviedb.org/3/movies/get-popular-movies
    $.getJSON(`${TMDB_BASE_URL}movie/popular?api_key=${TMDB_API_KEY}&language=en-US`, function(result) {
        callbackFunction(result.results);
    });
}

function GetMovieInformation(movieId, callbackFunction) {
    // https://developers.themoviedb.org/3/movies/get-movie-details
    $.getJSON(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=reviews,credits,videos`, function(result) {
        callbackFunction(result);
    });
}