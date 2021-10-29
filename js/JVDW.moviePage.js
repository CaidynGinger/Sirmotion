// variables for watch later function
let movieTitle;
let backDropPath;
let movieId;

$(document).ready(async function() {
    let languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
    let numberFormat = new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' });
    const urlParams = new URLSearchParams(window.location.search);
    movieId = urlParams.get('id');


    GetMovieInformation(movieId, function(movieDetails) {

        // set movie title and backdrop
        movieTitle = movieDetails.original_title;
        backDropPath = `${TMDB_IMAGE_API_BASE_URL}${movieDetails.backdrop_path}`;

        // Movie Information
        $("#movie-title").text(movieDetails.title);
        $(".summary").find(".movie-summary").html(movieDetails.overview);
        $("#individual-movie-img").attr("src", backDropPath)

        // Genres
        movieDetails.genres.forEach(genre => {
            $(".movie-genres").append(`<div class="genre d-flex justify-content-center">${genre.name}</div>`);
        });

        // Details
        $(".release-date").text(movieDetails.release_date);
        $(".runtime").text(getMovieRuntimeText(movieDetails.runtime));
        $(".vote-avg").text(movieDetails.vote_average);

        // Crew
        // Sort production crew by popularity descending
        let productionCrew = movieDetails.credits.crew.sort((a, b) => a.popularity <= b.popularity).filter(crew => crew.department == "Production");
        productionCrew.slice(0, 4).forEach(crewMember => {
            $(".movie-crew").append(`<div class="additional-info col-6 col-sm-4 col-md-3 col-xl-3">
            <div class="additional-info-primary">
                ${crewMember.name}
            </div>
            <div class="additional-info-secondary">
                ${crewMember.job}
            </div>
            </div>`);
        });

        // Cast
        let cast = movieDetails.credits.cast.slice(0, 6);
        let castRow = $(".movie-cast-imgs");
        cast.forEach(castMember => {
            $(castRow).append(`<div class="row col-6 col-md-2 col-lg-2" style="text-align: center">
                <img class="col-12 cast-img mx-auto" src=${getImgUrl(castMember.profile_path)}>
                <div class="col-12 cast-member">${castMember.name}</div>
                <div class="col-12 cast-role">as ${castMember.character}</div>
            </div>`);
        });

        // Reviews
        let reviews = movieDetails.reviews.results.slice(0, 4);
        let reviewBlock = $(".reviews").find(".row")[1];
        reviews.forEach(review => {
            $(reviewBlock).append(`<div class="review-card col-12 col-md-12 col-lg-6" onclick="openUrlInNewTab('${review.url}')">
            <div class="row h-100">
                <div class="col-2 m-auto d-block">
                    <img class="review-img m-auto d-block" src="${getImgUrl(review.author_details.avatar_path)}">
                </div>
                <div class="col-10 row">
                    <div class="col-6">
                        <div class="review-by">${review.author}</div>
                        <div class="review-date">${review.created_at.slice(0, 10)}</div>
                    </div>
                    <div class="col-6">
                        <div class="row movie-rating" style="--bs-gutter-x: 2px;">
                            <img class="col-6 star" src="../img/star.svg" style="margin-left: auto">
                            <div class="col-6 rating">${review.author_details.rating ?? "No Rating"}</div>
                        </div>
                    </div>
                    <div class="col-12 review-content">${review.content.slice(0, review.content.indexOf(' ', 250))}${review.content.length>250?" ...":""}</div>
                </div>
            </div>
        </div>`)
        });

        if (reviews.length == 0) {
            $(".reviews").hide();
        }

        // Media
        let videos = movieDetails.videos.results.filter(video => video.site === "YouTube").slice(0, 2);
        videos.forEach(video => {
            $(".movie-media-videos").append(`<iframe id="${video.key}" class="movie-video-backdrop col-12 col-md-6" src="https://www.youtube-nocookie.com/embed/${video.key}?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
        });

        let backdrops = movieDetails.images.backdrops.slice(0, 2);
        backdrops.forEach(backdrop => {
            $(".movie-media-backdrops").append(`<img class="movie-video-backdrop col-12 col-md-6" src="${TMDB_IMAGE_API_BASE_URL}${backdrop.file_path}"></img>`);
        });

        let posters = movieDetails.images.posters.slice(0, 2);
        posters.forEach(poster => {
            $(".movie-media-posters").append(`
            <div class="row col-12 col-md-6">
                <img class="movie-posters" src="${TMDB_IMAGE_API_BASE_URL}${poster.file_path}"></img>
            </div>`);
        });

        // Media button click
        $(".media-btn").click(function() {
            $(".media-btn").removeClass("media-btn-active");
            $(".movie-media").hide();
            let activeButton = $(this);
            $(activeButton).addClass("media-btn-active");
            if (activeButton.text() == "Videos") {
                $(".movie-media-videos").show();
            } else if (activeButton.text() == "Backdrops") {
                $(".movie-media-backdrops").show();
            } else {
                $(".movie-media-posters").show();
            }
        });

        // Other Details
        $("#movie-status").text(movieDetails.status);
        $("#movie-language").text(languageNames.of(movieDetails.original_language));
        $("#movie-budget").text(numberFormat.format(movieDetails.budget));
        $("#movie-revenue").text(numberFormat.format(movieDetails.revenue));
    });
});

function openUrlInNewTab(url) {
    if (!url) return;
    window.open(url, '_blank');
}

function getMovieRuntimeText(minutes) {
    let hours = Math.floor(minutes / 60);
    minutes -= hours * 60;

    return `${hours > 0 ? hours + "h " : ""}${minutes}m`;
}

function getImgUrl(imgPath) {
    if (imgPath == undefined || imgPath == null) {
        imgPath = "../img/default-user.jpg";
        return imgPath;
    }

    if (imgPath.includes('http')) {
        if (imgPath[0] == '/') {
            imgPath = imgPath.slice(1, imgPath.length - 1);
        }
        return imgPath;
    }

    return `${TMDB_IMAGE_API_BASE_URL}/${imgPath}`;
}


// add movies to watchlater page 
function addToWatchLater() {
    let movieIsSaved = false;
    let movie = { "movieId": movieId, "title": movieTitle, "movieBackdrop": backDropPath };
    // get saved movies
    let savedMovies = localStorage.getItem("watch_later_list");
    // check if user has movies saved
    if (savedMovies !== null) {
        // convert saved movie string to readable array
        savedMovies = JSON.parse(savedMovies);
        // check if movie is already in the watch later list
        // console.log(savedMovies);
        for (let loop_count = 0; loop_count < savedMovies.length; loop_count++) {
            if (savedMovies[loop_count].movieId === movieId) {
                movieIsSaved = true;
                //show an alert when the movie is already in 
                // the watch later list
                alert(`${movieTitle} has already been added to the watch later list.`);
            }
        }

        // add movie to the watch later list
        if (movieIsSaved === false) {
            savedMovies.push(movie);
            // save updated movie list
            let watch_later_list = JSON.stringify(savedMovies);
            localStorage.setItem("watch_later_list", watch_later_list);
        }


    } else {
        let watch_later_list = JSON.stringify([movie]);
        localStorage.setItem("watch_later_list", watch_later_list);
    }

}