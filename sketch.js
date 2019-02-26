// API CONSTSTANS
const base_uri = "https://api.themoviedb.org/3/";
const multi_search_uri = "search/multi?api_key=";
const api_key = "78d63b1460f97e40ae074569f22c1526";
const query_search = "&query=";
const page_search = "&page=";
const images_uri = "https://image.tmdb.org/t/p/original";
const movie_specific_uri = "movie/";
const tv_specific_uri = "tv/";
const timeout = 1000;

let QUERY;
let Query_Old = "*********";
let Full_Request;
let page_number = 1;
let started = false;

let all_items;
let all_genres;
let item = [];
let extra_info = [];
let extra_items;
let results_number;
function setup() {
  loadJSON("assets/genres.json", genresResult);
  noCanvas();
  noLoop();
}

// GETTERS & SETTERS
{
  function loadQUERY() {
    QUERY = document.getElementById("search-box").value;
  }

  function genresResult(result) {
    all_genres = result;
  }

  function queryResult(result) {
    all_items = result;
    results_number = all_items.total_results;
  }

  // function getAdditionalInfo(result) {
  //   extra_items = result;
  // }

  // function loadPosters(result) {
  //   posters.push(result);
  // }
}

// -------------------------------------------------------

function IMDBQueryStart(started) {
  // Load Page 2 or higher?
  if (started) {
    page_number++;
    QUERY = QUERY.replace("%20", " ");
  } else {
    loadQUERY();
    item = [];
    extra_info = [];
    page_number = 1;
  }
  Full_Request =
    base_uri +
    multi_search_uri +
    api_key +
    query_search +
    QUERY +
    page_search +
    page_number;
  if (Full_Request !== Query_Old) {
    console.log("Multi-Search-Term: " + QUERY);
    Query_Old = Full_Request;
    QUERY = QUERY.replace(" ", "%20");
    // QUERY:
    loadJSON(Full_Request, queryResult);
    setTimeout(function() {
      structureAll();
      createHTML(item, results_number, QUERY.replace("%20", " "));
    }, timeout);
  }
}

function structureAll() {
  for (let i = 0; i < all_items.results.length; i++) {
    // Person?
    if (all_items.results[i].media_type == "person") {
      results_number--;
    } else if (all_items.results[i].media_type == "movie") {
      item.push(sortByMovie(i));
      // loadJSON(
      //   base_uri + movie_specific_uri + item[i][8] + "?api_key=" + api_key,
      //   getAdditionalInfo
      // );
      // extra_info.push(extraInfoMov());
    } else {
      item.push(sortByTV(i));
      // loadJSON(
      //   base_uri + tv_specific_uri + item[i][8] + "?api_key=" + api_key,
      //   getAdditionalInfo
      // );
      // extra_info.push(extraInfoTV());
    }
  }
}

// function extraInfoMov() {
//   let temp_item = [];
//   temp_item.push(extra_items.budget);
//   temp_item.push(extra_items.revenue);
//   temp_item.push(extra_items.production_companies);
//   return temp_item;
// }

// function extraInfoMov() {
//   let temp_item = [];
//   temp_item.push(extra_items.number_of_seasons);
//   temp_item.push(extra_items.number_of_episodes);
//   temp_item.push(extra_items.production_companies);
//   temp_item.push(extra_items.created_by);
//   return temp_item;
// }

function sortByMovie(num) {
  let temp_item = [];
  temp_item.push(all_items.results[num].title);
  temp_item.push("Movie");
  temp_item.push(all_items.results[num].vote_average);
  temp_item.push(all_items.results[num].original_language);
  temp_item.push(findGenres(all_items.results[num].genre_ids));
  temp_item.push(all_items.results[num].overview);
  temp_item.push(all_items.results[num].release_date);
  temp_item.push(all_items.results[num].poster_path);
  temp_item.push(all_items.results[num].id);
  return temp_item;
}
function sortByTV(num) {
  let temp_item = [];
  temp_item.push(all_items.results[num].name);
  temp_item.push("TV show");
  temp_item.push(all_items.results[num].vote_average);
  temp_item.push(all_items.results[num].original_language);
  temp_item.push(findGenres(all_items.results[num].genre_ids));
  temp_item.push(all_items.results[num].overview);
  temp_item.push(all_items.results[num].first_air_date);
  temp_item.push(all_items.results[num].poster_path);
  temp_item.push(all_items.results[num].id);
  return temp_item;
}

function findGenres(genres) {
  let gens = [];
  for (let i = 0; i < genres.length; i++) {
    for (let j = 0; j < all_genres.genres.length; j++) {
      if (all_genres.genres[j].id == genres[i]) {
        gens.push(all_genres.genres[j].name);
        break;
      }
    }
  }
  return gens;
}
