import React from 'react'
import './Logs.css'
export default function Logs({ logs , index }) {
    return (
      <div className="movieforwatch">
        <div className="movieforwatch-info">
            <div className='row'>
                    <div className="col-md-3">
                            <p className="movie-title">{index + 1}. {logs[1]}</p>
                    </div>
                    <div className="col-md-3">
                            <p> USERID :{logs[2]}</p>
                    </div>
                    <div className="col-md-3">
                            <p>PARAMS : {logs[4]}</p>
                    </div>
                    <div className="col-md-3">
                            <p>TIME : {logs[3]}</p>
                    </div>

            </div>
          
          
        </div>
      </div>
  )
}
