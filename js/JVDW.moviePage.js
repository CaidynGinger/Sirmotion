$(document).ready(async function() {
    let languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
    let numberFormat = new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' });
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    GetMovieInformation(movieId, function(movieDetails) {
        console.log("movieDetails", movieDetails);

        // Movie Information
        let backDropPath = `${TMDB_IMAGE_API_BASE_URL}${movieDetails.backdrop_path}`;
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
            $(".movie-crew").append(`<div class="additional-info col-4 col-sm-4 col-md-3 col-xl-3">
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
        console.log("Cast", cast);
        let castRow = $(".movie-cast-imgs");
        cast.forEach(castMember => {
            $(castRow).append(`<div class="row col-6 col-md-2 col-lg-2 m-auto" style="text-align: center">
                <img class="col-12 cast-img mx-auto" src=${getImgUrl(castMember.profile_path)}>
                <div class="col-12 cast-member">${castMember.name}</div>
                <div class="col-12 cast-role">as ${castMember.character}</div>
            </div>`);
        });

        // Reviews
        let reviews = movieDetails.reviews.results;
        console.log("Reviews", reviews);
        let reviewBlock = $(".reviews").find(".row")[1];
        reviews.forEach(review => {
            $(reviewBlock).append(`<div class="review-card col-12 col-md-12 col-lg-6">
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
                    <div class="col-12 review-content">${review.content.slice(0, review.content.indexOf(' ', 250))}${review.content.length>250?"...":""}</div>
                </div>
            </div>
        </div>`)
        });

        if (reviews.length == 0) {
            $(reviewBlock).append("No Reviews");
        }

        // Media
        let videos = movieDetails.videos.results.filter(video => video.site === "YouTube").slice(0, 2);
        videos.forEach(video => {
            $(".movie-media").append(`<iframe id="${video.key}" class="movie-video col-12 col-md-6 h-150" src="https://www.youtube-nocookie.com/embed/${video.key}?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
        })

        if (videos.length == 0) {
            $(".movie-media").append("No Videos");
        }

        // Other Details
        $("#movie-status").text(movieDetails.status);
        $("#movie-language").text(languageNames.of(movieDetails.original_language));
        $("#movie-budget").text(numberFormat.format(movieDetails.budget));
        $("#movie-revenue").text(numberFormat.format(movieDetails.revenue));

        // Trailers
        // var mostRecentOfficialTrailers = movieDetails.videos.results.filter(video => video.official && video.type == 'Trailer' && video.site == 'YouTube').sort(function(a, b) { return b.published_at - a.published_at });
        // let movieTrailer = mostRecentOfficialTrailers[0];
        // console.log("movieTrailer", movieTrailer);
        // console.log("Youtube Link", `https://www.youtube.com/watch?v=${movieTrailer?.key}`);
    });
});

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