const TMDB_BASE_URL = "https://api.themoviedb.org/3/";
const TMDB_IMAGE_API_BASE_URL = "https://image.tmdb.org/t/p/original";
const TMDB_API_KEY = "57db82bc0de6cdceb2fd80b8ab052215";
const API_URL = TMDB_BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ TMDB_API_KEY;



const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
  const tagsEl = document.getElementById('tags');

  window.onload = function() {

    var selectedGenre = []
    setGenre();
    
    function setGenre() {
        tagsEl.innerHTML= '';
        genres.forEach(genre => {
            const t = document.createElement('div');
            t.classList.add('tag');
            t.id=genre.id;
            t.innerText = genre.name;
            t.addEventListener('click', () => {
                if(selectedGenre.length == 0){
                    selectedGenre.push(genre.id);
                }else{
                    if(selectedGenre.includes(genre.id)){
                        selectedGenre.forEach((id, idx) => {
                            if(id == genre.id){
                                selectedGenre.splice(idx, 1);
                            }
                        })
                    }else{
                        selectedGenre.push(genre.id);
                    }
                }
                console.log(selectedGenre)
                GetMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
                highlightSelection()
            })
            tagsEl.append(t);
        })
    }

}



$(document).ready(function() {});



function GetMostPopularMovies(callbackFunction) {
    // https://developers.themoviedb.org/3/movies/get-popular-movies
    $.getJSON(`${TMDB_BASE_URL}movie/popular?api_key=${TMDB_API_KEY}&language=en-US`, function(result) {
        callbackFunction(result.results);
    });
}

function GetMovieInformation(movieId, callbackFunction) {
    // https://developers.themoviedb.org/3/movies/get-movie-details
    $.getJSON(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=reviews,credits,videos`, function(result) {
        callbackFunction(result);
    });
}