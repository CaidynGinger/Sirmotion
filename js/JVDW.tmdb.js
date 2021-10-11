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
    $.getJSON(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`, function(result) {
        callbackFunction(result);
    });
}

function GetMovieReviews(movieId, callbackFunction) {
    // https://developers.themoviedb.org/3/movies/reviews
    $.getJSON(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}&language=en-US`, function(result) {
        callbackFunction(result.results);
    });
}

function GetMovieCast(movieId, callbackFunction) {
    // https://developers.themoviedb.org/3/movies/get-movie-credits
    $.getJSON(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`, function(result) {
        callbackFunction(result.cast);
    });
}

function GetMovieTrailer(movieId, callbackFunction) {
    // https: //developers.themoviedb.org/3/movies/get-movie-videos
    $.getJSON(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`, function(result) {
        var mostRecentOfficialTrailers = result.results.filter(video => video.official && video.type == 'Trailer' && video.site == 'YouTube').sort(function(a, b) { return b.published_at - a.published_at });
        callbackFunction(mostRecentOfficialTrailers[0]);
    });
}