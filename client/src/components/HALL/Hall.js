import React, { useEffect, useState } from 'react'
import './Hall.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Logs from './Logs';

export default function Hall() {
 
  const {id}= useParams();

  const [hall , setHall] = useState();
  const [moviename , setMoviename] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/gethalls", {
          id: id
        });
        console.log(response.data.moviename.rows[0][0])
        setMoviename(response.data.moviename.rows[0][0])
        setHall(response.data.result.rows);
        
        
      } catch (error) {
        
      }
    }
    fetchData();
  },[id]);
    
  return (
    <div className='containerd'>
      <p> <h2>"{moviename && moviename}" showin at:</h2></p>
        <div class="col-md-12">
       
                      <div className="card mb-3">
                        <p style={{color: 'black'}}><h4>Hall List</h4></p>
                        <div style={{backgroundColor: '#212529'}}>
                          { hall && hall.map((logs, index) => (
                            <Logs key={index} logs={logs} index={index} />
                          ))}
                        </div>
                      </div>
                                  
        </div>
      
    </div>
  )
}
