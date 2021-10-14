$(document).ready(async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    GetMovieInformation(movieId, function(movieDetails) {
        console.log("movieDetails", movieDetails);

        // Movie Information
        let backDropPath = `${TMDB_IMAGE_API_BASE_URL}${movieDetails.backdrop_path}`;
        $("#movie-title").text(movieDetails.title);
        $(".summary").find(".movie-section-details").html(movieDetails.overview);
        $("#individual-movie-img").attr("src", backDropPath)

        // Reviews
        let reviews = movieDetails.reviews.results;
        console.log("Reviews", reviews);
        let reviewBlock = $(".reviews").find(".row")[1];
        reviews.forEach(review => {
            $(reviewBlock).append(`<div class="review-card col-12 col-lg-6">
            <div class="row">
                <div class="col-2 m-auto d-block">
                    <img class="review-img m-auto d-block" src="${getReviewAuthorImgUrl(review)}">
                </div>
                <div class="col-10 row">
                    <div class="col-6">
                        <div class="review-by">${review.author}</div>
                        <div class="review-date">${review.created_at.slice(0, 10)}</div>
                    </div>
                    <div class="col-6 review-rating">${review.author_details.rating ?? ""}</div>
                    <div class="col-12 review-content">${review.content.slice(0, review.content.indexOf(' ', 350))}${review.content.length>350?"...":""}</div>
                </div>
            </div>
        </div>`)
        });

        // Cast
        let cast = movieDetails.credits.cast.slice(0, 6);
        console.log("Cast", cast);
        let castRow = $(".movie-cast-imgs");
        cast.forEach(castMember => {
            $(castRow).append(`<img class="cast-img" src=${TMDB_IMAGE_API_BASE_URL + castMember.profile_path}>`);
        });

        // Trailers
        var mostRecentOfficialTrailers = movieDetails.videos.results.filter(video => video.official && video.type == 'Trailer' && video.site == 'YouTube').sort(function(a, b) { return b.published_at - a.published_at });
        let movieTrailer = mostRecentOfficialTrailers[0];
        console.log("movieTrailer", movieTrailer);
        console.log("Youtube Link", `https://www.youtube.com/watch?v=${movieTrailer?.key}`);
    });
});

function getReviewAuthorImgUrl(review) {
    let imgPath = review.author_details.avatar_path;
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