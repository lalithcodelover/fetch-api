import React, { useCallback, useEffect, useRef, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [Movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong...Retrying");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>No movies found</p>;
  if (error) {
    content = <p>{error}</p>;
  }
  if (Movies.length > 0) {
    content = <MoviesList movies={Movies} />;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  let newMovieObj = {
    Title: titleRef.current.value,
    OpeningText: openingTextRef.current.value,
    ReleaseDate: releaseDateRef.current.value,
  };

  const addMovieHandler = (e) => {
    e.preventDefault();
    console.log(newMovieObj);
  };

  return (
    <React.Fragment>
      <section >
        <form className="formlist" onSubmit={addMovieHandler}>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" ref={titleRef} />
          <label htmlFor="opening-text">Opening text</label>
          <input id="opening-text" type="text" ref={openingTextRef} />
          <label htmlFor="release-date">Release Date</label>
          <input id="release-date" type="text" ref={releaseDateRef} />
          <button>Add Movie</button>
        </form>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
