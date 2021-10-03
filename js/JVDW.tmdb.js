const imgAPIBaseURL = "https://image.tmdb.org/t/p/original";

$(document).ready(function() {
    // We need all the Movie Ids that we need to retrieve data for. 
    GetMovieInformation(475557);
    GetMovieTrailer(475557);
});

function GetMovieInformation(movieId) {
    // https://developers.themoviedb.org/3/movies/get-movie-details
    $.getJSON(`https://api.themoviedb.org/3/movie/${movieId}?api_key=57db82bc0de6cdceb2fd80b8ab052215&language=en-US`, function(result) {
        console.log(result);
        console.log(result.title)
        console.log(result.overview)

        let backDropPath = `${imgAPIBaseURL}${result.backdrop_path}`;

        console.log(`${imgAPIBaseURL}${result.poster_path}`)
        console.log(backDropPath)

        $("#movie_title").text(result.title);
        $("#movie_img").attr("src", `${imgAPIBaseURL}${result.backdrop_path}`);
        $("#home-main-movie").attr("src", backDropPath)
        $("#individual-movie-img").attr("src", backDropPath)
    });
}

function GetMovieTrailer(movieId) {
    // https: //developers.themoviedb.org/3/movies/get-movie-videos
    $.getJSON(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=57db82bc0de6cdceb2fd80b8ab052215&language=en-US`, function(result) {
        console.log(result);
        var mostRecentOfficialTrailers = result.results.filter(video => video.official && video.type == 'Trailer' && video.site == 'YouTube').sort(function(a, b) { return b.published_at - a.published_at });
        console.log(mostRecentOfficialTrailers);
        console.log("Youtube Link", `https://www.youtube.com/watch?v=${mostRecentOfficialTrailers[0].key}`);

        // to get movie trailer and set src on a youtube iframe
        // $("#movie-iframe").attr("src", `https://www.youtube.com/embed/${mostRecentOfficialTrailers[0].key}?controls=0`)
    });
}