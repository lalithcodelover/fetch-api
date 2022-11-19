import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  
  function deleteMovie(){
    props.onDeleteMovie(props.id)
     console.log(props.id)
  }
  
  return (
    <li key={props.id} className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <p>{props.id}</p>
  <button onClick={deleteMovie}>Delete</button>
    </li>
    
  );
};

export default Movie;
