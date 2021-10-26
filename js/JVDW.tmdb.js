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
    $.getJSON(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=reviews,credits,videos,images`, function(result) {
        callbackFunction(result);
    });
}

function GetGenreList(callbackFunction) {
    // https://developers.themoviedb.org/3/genres/get-movie-list
    $.getJSON(`${TMDB_BASE_URL}genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`, function(result) {
        this.genres = result.genres;
        callbackFunction(result.genres);
    });
}

function GetFilteredMovies(year = undefined, selectedGenres, rating = 0, callbackFunction) {
    // https://developers.themoviedb.org/3/discover/movie-discover
    var url = `${TMDB_BASE_URL}discover/movie?sort_by=popularity.desc&api_key=${TMDB_API_KEY}&with_genres=${selectedGenres}&year=${year}&vote_average.gte=${rating}&language=en-US`;
    $.getJSON(url, function(result) {
        callbackFunction(result.results);
    });
}

// get search results
function GetSearchResults(search_term,callbackFunction){
    var url = `${TMDB_BASE_URL}search/movie?api_key=${TMDB_API_KEY}&query=${search_term}`;
    $.getJSON(url, function(result) {
        callbackFunction(result.results);
    }); 
}