
$(document).ready(function () {
    getWathcLaterMovie();    
});

function getWathcLaterMovie(){
    // get saved movies
    let savedMovies = localStorage.getItem("watch_later_list");
    // get saved movies array
    savedMovies = JSON.parse(savedMovies);

    // loop through movie list
    // and append to html page
    for(let loop_count = 0; loop_count < savedMovies.length; loop_count++){
        let movieBackdrop = savedMovies[loop_count].movieBackdrop;
        let movieTitle = savedMovies[loop_count].title;
        let movieId = savedMovies[loop_count].movieId;

        // create liked movie div
        let movieDiv = '<div class="col-lg-2 col-md-3 col-sm-6 movive-item"><div class="child watch-later-movie" style="background-image:url('+movieBackdrop+');background-size:cover"><span>'+movieTitle+'<span> <button class="remove-btn" onclick="removeFromList('+Number(movieId)+')">Remove</button></div></div>';
        $("#watch-later-list").append(movieDiv);
    }

    // change movie banner
    $('.movie-banner').css("background-image",`url(${savedMovies[0].movieBackdrop}`);
    // change movie title
    $('.movie-name').text(savedMovies[0].title);
}


function removeFromList(movieId){
    // get saved movies
    let savedMovies = localStorage.getItem("watch_later_list");
    // get saved movies array
    savedMovies = JSON.parse(savedMovies);

    for(let loop_count = 0; loop_count < savedMovies.length; loop_count++){
        console.log(savedMovies[loop_count].movieId == movieId);

        // remove movie with corresponding id
        if(movieId == savedMovies[loop_count].movieId){
            savedMovies.splice(loop_count,1);
            // saved updated movie list
            localStorage.setItem("watch_later_list",JSON.stringify(savedMovies));

            // remove item
            $(document).ready(function () {
                $(".remove-btn").onclick(function(){
                    $(".child").find(movieId).remove()
                })
            
                
            });

        }
    }
   
}
$(document).ready(function () {
    $(".child").mouseenter(function(){
        $(this).find(".remove-btn").fadeIn()
    }) 
    $(".child").mouseleave(function(){
        $(this).find(".remove-btn").fadeOut()
    }) 


});