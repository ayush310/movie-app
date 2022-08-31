import React from "react";
import AddPrivates from "../PvtMovies/AddPrivates";
const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="image-container d-flex justify-content-start m-3">
          <img src={movie.Poster} alt="movie"></img>
          <div className="overlay d-flex align-items-center justify-content-center">
            <div
              className="ml-3 mr-3"
              onClick={() => props.handleFavouritesClick(movie)}
            >
              <FavouriteComponent />
            </div>
            <div
              className="ml-3 mr-3"
              onClick={() => props.handlePrivatesClick(movie)}
            >
              <AddPrivates />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
