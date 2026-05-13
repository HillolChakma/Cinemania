import React from 'react'
import './Movie.css'
export default function Movie({ movie, index }) {
    return (
      <div className="movieforwatch">
        <div className="movieforwatch-info">
            <div className='row'>
            <div className="col-md-6">
            <p className="movie-title">{index + 1}. {movie[1]}</p>
            </div>
            <div className="col-md-6">
            <p>Watch Time: {movie[15]}</p>
            </div>

            </div>
          
          
        </div>
      </div>
  )
}
