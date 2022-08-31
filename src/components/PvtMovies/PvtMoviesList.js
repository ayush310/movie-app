import React from "react";
import RemovePrivates from "./RemovePrivates";

const PvtMovieList = (props) => {
  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="image-container d-flex justify-content-start m-3">
          <img src={movie.Poster} alt="movie"></img>
          <div
            onClick={() => props.handleRemovePvt(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <RemovePrivates />
          </div>
        </div>
      ))}
    </>
  );
};

export default PvtMovieList;
