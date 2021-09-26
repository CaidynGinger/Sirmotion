$(document).ready(function () {
    // We need all the Movie Ids that we need to retrieve data for. 
    GetMovieInformation(436970);
    GetMovieInformation(436969);
});

function GetMovieInformation(movieId) {
    // https://developers.themoviedb.org/3/movies/get-movie-details
    $.ajax({
        url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=57db82bc0de6cdceb2fd80b8ab052215&language=en-US`
    }).done(function (result) {
        console.log(result);
        console.log(result.title)
        console.log(result.overview)
        console.log(`https://image.tmdb.org/t/p/w185_and_h278_bestv2${result.poster_path}`)

        $("#movie_title").text(result.title);
        $("#movie_img").attr("src", `https://image.tmdb.org/t/p/w185_and_h278_bestv2${result.poster_path}`);
    });
}