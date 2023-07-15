  function renderMovieCards(unorderedMovies) {
    const moviesList = document.getElementById("movies-list");
    moviesList.innerHTML = "";
    // sort movies by date object in descending order
    const movies = unorderedMovies.sort((a, b) => b.date.localeCompare(a.date));
  

    const table = document.createElement("table");
    table.classList.add("table", "table-dark");
    const thead = document.createElement("thead");
    thead.classList.add("thead-dark");
    const headerRow = document.createElement("tr");
  
    // movie card headers
    const headers = ["Title", "Poster", "Genre(s)", "Rating", "Year Release", "Metacritic Rating", "Runtime"];
    headers.forEach(headerText => {
      const header = document.createElement("th");
      header.textContent = headerText;
      header.setAttribute("scope", "col");
      headerRow.append(header);
    });
    thead.append(headerRow);
    table.append(thead);
    moviesList.appendChild(table);
  
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
  
    movies.forEach(movie => {
      movie.movies.forEach(singleMovie => {
        const row = document.createElement("tr");
  
        if (movie.movies.indexOf(singleMovie) === 0) {
          const datewiseRow = document.createElement("tr");
          datewiseRow.classList.add("datewise");
          tbody.appendChild(datewiseRow);
  
          const dateCell = document.createElement("td");
          dateCell.setAttribute("colspan", "7");
          const titleDate = new Date(movie.date);
          const localizedDateString = titleDate.toLocaleString();
          dateCell.textContent = localizedDateString;
          datewiseRow.appendChild(dateCell);
        }
  
        const title = document.createElement("td");
        const titleh2 = document.createElement("h2");
        titleh2.textContent = singleMovie.title;
        title.append(titleh2);
        row.appendChild(title);
  
        const movieCard = document.createElement("td");
        movieCard.classList.add("movie-card");
        const image = document.createElement("img");
        image.classList.add("thumbnail");
        image.src = singleMovie.poster;
        movieCard.appendChild(image);
        row.appendChild(movieCard);
  
        const genre = document.createElement("td");
        genre.classList.add("genre");
        genre.textContent = singleMovie.genre ? singleMovie.genre.join(", ") : "";
        row.appendChild(genre);
  
        const rating = document.createElement("td");
        rating.textContent = singleMovie.imdb_rating;
        row.appendChild(rating);
  
        const releaseDate = document.createElement("td");
        releaseDate.textContent = singleMovie.released;
        row.appendChild(releaseDate);
  
        const metacritic = document.createElement("td");
        const metacriticRating = singleMovie.Ratings.find(
          rating => rating.source === "Metacritic"
        );
        const metacriticValue = metacriticRating ? metacriticRating.value : "N/A";
        metacritic.textContent = metacriticValue;
        row.appendChild(metacritic);
  
        const runtime = document.createElement("td");
        runtime.textContent = "Runtime: " + singleMovie.runtime;
        row.appendChild(runtime);
  
        tbody.appendChild(row);
      });
    });
  }
  
  

  function getGenreList() {
    const genres = [];
    moviesData.forEach(datewise => {
      datewise.movies.forEach(movie => {
        genres.push(...movie.genre);
      });
    });
  
    const uniqueGenres = Array.from(new Set(genres));
    return uniqueGenres;
  }  
  
  // Function to populate the genre filter dropdown
  function renderGenreFilter() {
    let genres = getGenreList()
    const genreFilter = document.getElementById("genre-filter");
    genreFilter.innerHTML = "";
  
    genres.forEach(genre => {
      const option = document.createElement("option");
      option.value = genre;
      option.textContent = genre;
      genreFilter.appendChild(option);
    });
  }
  
  function handleGenreFilterChange() {
    const selectedGenres = Array.from(this.selectedOptions).map(option => option.value);
    const filteredMoviesData = moviesData.map(datewise => {
      const filteredMovies = datewise.movies.filter(movie => {
        return movie.genre.some(genre => selectedGenres.includes(genre));
      });
      return { date: datewise.date, movies: filteredMovies };
    });
    renderMovieCards(filteredMoviesData);
  }
  
  function handleTitleSearchInput() {
    const searchQuery = this.value.toLowerCase();
    const filteredMoviesData = moviesData.map(datewise => {
      const filteredMovies = datewise.movies.filter(movie => {
        return movie.title.toLowerCase().includes(searchQuery);
      });
      return { date: datewise.date, movies: filteredMovies };
    });
    renderMovieCards(filteredMoviesData);
  }
  
window.addEventListener("load", () => {
    // Event listeners
  document.getElementById("genre-filter").addEventListener("change", handleGenreFilterChange);
  document.getElementById("title-search").addEventListener("input", handleTitleSearchInput);
  
  // Initial generation of movie cards and genre filter
  renderMovieCards(moviesData);
  renderGenreFilter();
})
  