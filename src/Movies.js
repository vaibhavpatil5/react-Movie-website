import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from './context';

export default function Movies() {
  const { isLoading, movie } = useGlobalContext();

  return (
    <div>
      <section className="movie-page">
        <div className="container grid grid-4-col">
          {isLoading ? (
            <h1>Loading..</h1>
          ) : (
            movie.map((curMovieElem) => {
              const { imdbID, Title, Poster } = curMovieElem;
              const movieName = Title.substring(0, 15);

              return (
                <NavLink to={`movie/${imdbID}`} key={imdbID}>
                  <div className="card">
                    <div className="card-info">
                      <h2>
                        {movieName.length > 13 ? `${movieName}...` : movieName}
                      </h2>
                      <img src={Poster} alt={imdbID} />
                    </div>
                  </div>
                </NavLink>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
