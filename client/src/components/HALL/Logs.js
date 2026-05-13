import React, { useEffect, useState } from 'react'
import './Logs.css'
import { Link, useParams } from 'react-router-dom'

export default function Logs({ logs , index }) {

    return (
        <Link to={`${logs[3]}`} style={{textDecoration:"none", color:"white"}}>
      <div className="movieforwatch">
        <div className="movieforwatch-info">
            <div className='row'>
                    <div className="col-md-3">
                            <p className="movie-title">{index + 1}. {logs[2]}</p>
                    </div>
                    <div className="col-md-3">
                            <p> Location :{logs[4]}</p>
                    </div>
                    <div className="col-md-3">
                            <p>Start Time : {logs[0]}</p>
                    </div>
                    <div className="col-md-3">
                            <p>Show Date : {logs[1]}</p>
                    </div>

            </div>
          
          
        </div>
      </div>
      </Link>
  )
}
