$(document).ready(function() {
    GetMostPopularMovies(function(mostPopularMovies) {
        let featuredMovie = mostPopularMovies.filter(movie => movie.title.length <= 20 && movie.overview.length <= 200)[0];
        let backDropPath = `${TMDB_IMAGE_API_BASE_URL}${featuredMovie.backdrop_path}`;
        $(".home-movie").css("background-image", `url(${backDropPath})`);
        $("#movie-title-home").text(featuredMovie.title);
        $(".movie-section-details-home").html(featuredMovie.overview);

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