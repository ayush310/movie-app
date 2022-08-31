import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import MovieList from "./MovieList";
import MovieListHeading from "./MovieListHeading";
import SearchBox from "./SearchBox";
import AddFavourites from "../FavouriteMovies/AddFavourites";
import RemoveFavourites from "../FavouriteMovies/RemoveFavourites";
import AddPrivates from "../PvtMovies/AddPrivates";
import PvtMovieList from "../PvtMovies/PvtMoviesList";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [privates, setPrivates] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    const moviePvt = JSON.parse(
      localStorage.getItem("react-movie-app-privates")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
    if (moviePvt) {
      setPrivates(moviePvt);
    }
  }, []);

  const saveFavToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };
  const savePvtToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-privates", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    if (!favourites.includes(movie)) {
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      saveFavToLocalStorage(newFavouriteList);
    }
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveFavToLocalStorage(newFavouriteList);
  };

  const addPrivateMovie = (movie) => {
    if (!privates.includes(movie)) {
      const newPrivateList = [...privates, movie];
      setPrivates(newPrivateList);
      savePvtToLocalStorage(newPrivateList);
    }
  };

  const removePrivateMovie = (movie) => {
    const newPrivateList = privates.filter(
      (privatee) => privatee.imdbID !== movie.imdbID
    );
    setPrivates(newPrivateList);
    savePvtToLocalStorage(newPrivateList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
          handlePrivatesClick={addPrivateMovie}
          privateComponent={AddPrivates}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
          handlePrivatesClick={addPrivateMovie}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Private" />
      </div>
      <div className="row">
        <PvtMovieList movies={privates} handleRemovePvt={removePrivateMovie} />
      </div>
    </div>
  );
};

export default Home;
