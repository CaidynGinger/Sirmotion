var selectedGenre = "";
var selectedYear = undefined;
var selectedRating = 0;

$(document).ready(function() {
    populateFilters();
    applyFilters();

    $(".movie-tile").click(function() {
        location.href = `JVDW.moviePage.html?id=${$(this).attr("id")}`;
    });
});

function populateFilters() {
    // Genre
    $("#genre").empty();
    $("#genre").append(`<option value="-1">Genre</option>`);
    GetGenreList(function(genres) {
        genres.forEach(genre => {
            // add options to select
            $("#genre").append(`<option value="${genre.id}">${genre.name}</option>`);
        })
    });
    $("#genre").on("change", function() {
        selectedGenre = $(this).val();
        applyFilters();
    });

    // years
    $("#year").empty();
    $("#year").append(`<option value="${undefined}">Year</option>`);
    for (var yearOption = 2021; yearOption >= 2011; yearOption--) {
        // add options to select
        $("#year").append(`<option value="${yearOption}">${yearOption}</option>`);
    }

    $("#year").on("change", function() {
        selectedYear = $(this).val();
        applyFilters();
    });

    // Rating
    $("#rating").on("change", function() {
        selectedRating = $(this).val();
        applyFilters();
    });

}

function applyFilters() {
    GetFilteredMovies(selectedYear == -1 ? undefined : selectedYear, selectedGenre == "-1" ? "" : selectedGenre, selectedRating, function(movies) {
        SetMovies(movies);
    });
}

function SetMovies(movies = []) {
    $(".movie-tile").each(function(i, obj) {
        let currentMovie = movies[i];
        $(this).attr("id", currentMovie.id);
        $(this).html(`<img class="movie-tile-img" src="${TMDB_IMAGE_API_BASE_URL}${currentMovie.poster_path}" alt="${currentMovie.title} image">`);
    });
}