$(document).ready(function () {
    requestlistOfTopRatedMovieList(1)    
});


function requestlistOfTopRatedMovieList(page){
    let url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=dcf790b8205d22db54abf928e440fe94&language=en-US&page='+page
    $.getJSON(url,
        function (data) {
           console.log(data)
        }
    );
}