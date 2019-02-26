var div_result;
var results_num_cap;
var results_hrline;
var div_item;
var outerTab;
var poster_img;
var innerTab;
var item_type_cap;
var item_type_icon;
var item_title;
var item_year;
var item_score;
var item_genres;
var item_desc;

var tab_row;
var tab_poster;

var tab_col_info;
var tab_type;
var tab_title_year;
var tab_title;
var tab_year;
var tab_score;
var tab_genres;
var tab_desc;

function createHTML(items, results, search_item) {
  // DIV Container around all items
  div_result = document.getElementById("dr");
  div_result.parentNode.removeChild(div_result);
  div_result = document.createElement("div");
  document.body.appendChild(div_result);
  div_result.setAttribute("id", "dr");
  div_result.setAttribute("class", "div_result");

  // Search Results Caption (with horizontal line)
  setSearchResultsCap(results, search_item);
  // Every Movie / TV Show
  setEachItem(items);
}

function setSearchResultsCap(results, search_item) {
  results_num_cap = document.createElement("h1");
  results_num_cap.setAttribute("class", "h1-number");
  results_num_cap.innerHTML = results + " search results for " + search_item;
  div_result.appendChild(results_num_cap);
  results_hrline = document.createElement("hr");
  div_result.appendChild(results_hrline);
}

function setEachItem(items) {
  for (let i = 0; i < items.length; i++) {
    setDivEachItem(i); // DIV Container around each item
    createOuterTab(); // OUTER &
    createInnerTab(); // INNER Tab
    setPoster(items, i); // MOVIE/TV Poster
    setTitleCap(items, i); // Title + Year
    setType(items, i); // MOVIE or TV SHOW ?
    setYear(items, i); // Year
    setScore(items, i); // Score
    setGenres(items, i); // Genres
    setDesc(items, i); // Description
  }
}

// Single Elements
{
  function setDivEachItem(num) {
    div_item = document.createElement("div");
    div_item.setAttribute("id", "di-" + num);
    div_item.setAttribute("class", "div_item");
    div_result.appendChild(div_item);
  }

  // Tables for CSS
  {
    function createOuterTab() {
      outerTab = document.createElement("table");
      outerTab.setAttribute("class", "outerTab");
      div_item.appendChild(outerTab);
      tab_row = document.createElement("tr");
      tab_row.setAttribute("class", "tr-outerTab");
      outerTab.appendChild(tab_row);

      tab_poster = document.createElement("td");
      tab_poster.setAttribute("class", "td-poster");
      tab_row.appendChild(tab_poster);

      tab_col_info = document.createElement("td");
      tab_col_info.setAttribute("class", "td-info");
      tab_row.appendChild(tab_col_info);
    }
    function createInnerTab() {
      innerTab = document.createElement("table");
      innerTab.setAttribute("class", "innerTab");
      tab_col_info.appendChild(innerTab);

      tab_type = document.createElement("tr");
      tab_type.setAttribute("class", "tr-type");
      innerTab.appendChild(tab_type);

      tab_title_year = document.createElement("tr");
      tab_title_year.setAttribute("class", "tr-title_year");
      innerTab.appendChild(tab_title_year);

      tab_score = document.createElement("tr");
      tab_score.setAttribute("class", "tr_score");
      innerTab.appendChild(tab_score);

      tab_genres = document.createElement("tr");
      tab_genres.setAttribute("class", "tr_genres");
      innerTab.appendChild(tab_genres);

      tab_desc = document.createElement("tr");
      tab_desc.setAttribute("class", "tr_desc");
      innerTab.appendChild(tab_desc);
    }
  }

  function setPoster(items, num) {
    poster_img = document.createElement("img");
    poster_img.setAttribute("class", "img-poster");
    poster_img.setAttribute("height", "160");
    poster_img.setAttribute("width", "114");
    tab_poster.appendChild(poster_img);
    if (items[num][7] != null) {
      poster_img.setAttribute("src", images_uri + items[num][7]);
    } else {
      poster_img.setAttribute("src", "assets/no_poster.png");
    }
  }

  function setType(items, num) {
    // Text
    item_type_cap = document.createElement("h4");
    item_type_cap.setAttribute("class", "h4-type");
    item_type_cap.setAttribute("id", "tr-innerTab");
    tab_type.appendChild(item_type_cap);
    // Icon
    item_type_icon = document.createElement("i");
    item_type_icon.setAttribute("id", "tr-innerTab");
    if (items[num][1] == "Movie") {
      item_type_icon.setAttribute("class", "fas fa-film");
      item_type_cap.innerHTML = "Movie ";
      item_title.setAttribute(
        "href",
        "https://www.themoviedb.org/movie/" + item[num][8] + "/"
      );
    } else {
      item_type_icon.setAttribute("class", "fas fa-tv");
      item_type_cap.innerHTML = "TV Show ";
      item_title.setAttribute(
        "href",
        "https://www.themoviedb.org/tv/" + item[num][8] + "/"
      );
    }
    item_type_cap.appendChild(item_type_icon);
  }

  function setTitleCap(items, num) {
    item_title = document.createElement("a");
    item_title.setAttribute("class", "a-title");
    item_title.setAttribute("id", "tr-innerTab");
    item_title.innerHTML = items[num][0] + " ";
    tab_title_year.appendChild(item_title);
  }

  function setYear(items, num) {
    item_year = document.createElement("p");
    item_year.setAttribute("class", "p-year");
    item_year.setAttribute("id", "tr-innerTab");
    item_year.innerHTML = "(" + items[num][6] + ")";
    tab_title_year.appendChild(item_year);
  }

  function setScore(items, num) {
    if (items[num][2] != 0) {
      item_score = document.createElement("p");
      item_score.setAttribute("class", "p-score");
      item_score.setAttribute("id", "tr-innerTab");
      item_score.innerHTML = "Score: " + items[num][2] + "/10";
      tab_score.appendChild(item_score);
    }
  }

  function setDesc(items, num) {
    item_desc = document.createElement("p");
    item_desc.setAttribute("class", "p-desc");
    // item_desc.setAttribute("id", "tr-innerTab");
    item_desc.innerHTML = items[num][5];
    tab_score.appendChild(item_desc);
  }

  function setGenres(items, num) {
    if (items[num][4].length > 0) {
      item_genres = document.createElement("p");
      item_genres.setAttribute("class", "p-genres");
      item_genres.setAttribute("id", "tr-innerTab");
      let gens = "Genres: ";
      for (let i = 0; i < items[num][4].length; i++) {
        gens = gens + items[num][4][i];
        if (i !== items[num][4].length - 1) {
          gens = gens + ", ";
        }
      }
      item_genres.innerHTML = gens;
      tab_genres.appendChild(item_genres);
    }
  }
}
