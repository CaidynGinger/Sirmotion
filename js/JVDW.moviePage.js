$(document).ready(async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    GetMovieInformation(movieId, function(movieDetails) {
        console.log("movieDetails", movieDetails);

        let backDropPath = `${TMDB_IMAGE_API_BASE_URL}${movieDetails.backdrop_path}`;
        $("#movie-title").text(movieDetails.title);
        $(".summary").find(".movie-section-details").html(movieDetails.overview);
        $("#individual-movie-img").attr("src", backDropPath)
    });

    GetMovieReviews(movieId, function(reviews) {
        console.log("Reviews", reviews);
    });

    GetMovieCast(movieId, function(cast) {
        console.log("Cast", cast.slice(0, 6));
    });

    GetMovieTrailer(movieId, function(movieTrailer) {
        console.log("movieTrailer", movieTrailer);
        console.log("Youtube Link", `https://www.youtube.com/watch?v=${movieTrailer.key}`);
    });
});