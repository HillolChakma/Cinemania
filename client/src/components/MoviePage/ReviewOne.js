import React from 'react'

export default function ReviewOne ({ userName, comment })  {
  return (
    <div className="card mb-3">
    <div className="card-body">
      <h5 className="card-title">{userName}</h5>
      <p className="card-text">{comment}</p>
    </div>
  </div>
  )
}
