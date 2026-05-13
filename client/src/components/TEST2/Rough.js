import React from 'react';
import './Rough.css'; // Import CSS file

// Sample array of movie objects
const movies = [
  { name: 'Movie 1', watchTime: '2:30' },
  { name: 'Movie 2', watchTime: '1:45' },
  { name: 'Movie 3', watchTime: '3:00' },
  // Add more movies as needed
];

function MovieList() {
  return (
    <div>
      <h1>Movie List</h1>
      {movies.map((movie, index) => (
        <Movie key={index} movie={movie} index={index} />
      ))}
    </div>
  );
}

function Movie({ movie, index }) {
  return (
    <div className="movie">
      <div className="movie-info">
        <h2>{index + 1}. {movie.name}</h2>
        <p>Watch Time: {movie.watchTime}</p>
      </div>
    </div>
  );
}

export default MovieList;
