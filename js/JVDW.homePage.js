$(document).ready(function() {
    // $("#home-main-movie").attr("src", backDropPath);

    GetMostPopularMovies(function(mostPopularMovies) {
        $(".movie-tile").each(function(i, obj) {
            let currentMovie = mostPopularMovies[i];
            $(this).attr("id", currentMovie.id);
            $(this).html(`<img class="movie-tile-img" src="${TMDB_IMAGE_API_BASE_URL}${currentMovie.poster_path}" alt="${currentMovie.title} image">`);
        });
    });

    $(".movie-tile").click(function() {
        location.href = `JVDW.moviePage.html?id=${$(this).attr("id")}`;
    });
});