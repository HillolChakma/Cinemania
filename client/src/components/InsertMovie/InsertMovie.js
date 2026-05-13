import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InsertMovie.css'
export default function InsertMovie() {

    const [values, setvalues] = useState({
        moviename: '',
        synopsys: '',
        genre: '',
        dor : '',
        duration: '',
        fposter: '',
        bposter: '',
        rating: ''
    })
    const navigate = useNavigate();


    const handleInput= (event)=>{
        setvalues(prev => ({...prev, [event.target.name]: event.target.value})) 
   }

   const handleSubmit= (event)=>{
    event.preventDefault();
     console.log(values);
    // er sahajje amra data pathai 5000/signup api e res lagey na... server e lagey
    //erpor navigate kore onno page e
    axios.post("http://localhost:5000/insertmovie", values)
    .then(res=> {})
    .catch(err=> console.log(err));

}
  return (
    <div>
      {/* <!-- upper layout--> */}

      {/* <!-- Navigation Bar --> */}
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          {/* <!-- Left buttons --> */}
          <div class="navbar-nav">
            <a class="nav-link" href="#">
              Home
            </a>
            <a class="nav-link" href="#">
              About
            </a>
          </div>

          {/* <!-- Right button and link --> */}
          <div class="navbar-nav ms-auto">
            <a class="nav-link" href="#">
              Log in as admin?
            </a>
            <button class="btn btn-outline-primary" type="button">
              <a href="#">Log in</a>
            </button>
          </div>
        </div>
      </nav>

      {/* <!-- ekhane login page ache --> */}
      <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '50%'}}>
      <div class="container-fluid"  style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div class="insert-container">
          <h2 class="login-header" style={{ color: 'white' }}>Movie Details</h2>

          {/* form er onsubmit deya lagey + function call hobey */}

          <form action="" method="post" onSubmit={handleSubmit} className='white-text'>
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label for="moviename" class="form-label" style={{ color: 'black' }}>
                    Title
                  </label>
                  <input onChange={handleInput}
                    type="text"
                    class="form-control"
                    id="moviename"
                    name="moviename"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="synopsys" class="form-label" style={{ color: 'black' }}>
                    Synopsys:
                  </label>
                  <input onChange={handleInput}
                    type="text"
                    class="form-control"
                    id="synopsys"
                    name="synopsys"
                    required
                  />
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label for="dor" class="form-label" style={{ color: 'black' }}>
                    Date of Release:
                  </label>
                  <input onChange={handleInput}
                    type="text"
                    class="form-control"
                    id="dor"
                    name="dor"
                    autocomplete="off"
                  />
                </div>
                <div class="mb-3">
                  <label for="duration" class="form-label" style={{ color: 'black' }}>
                   Duration:
                  </label>
                  <input onChange={handleInput}
                    type="text"
                    class="form-control"
                    id="duration"
                    name="duration"
                    autocomplete="off"
                  />
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label for="genre" class="form-label" style={{ color: 'black' }}>
                Genre:
              </label>
              <select onChange={handleInput}
                class="form-select"
                id="genre"
                name="genre"
                data-live-search="true"
              >
                {/* <!-- Add options for each country --> */}
                <option value="Horror">Horror</option>
                <option value="Comedy">Comedy</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Animation">Animation</option>
                <option value="Crime">Crime</option>
                <option value="Documentary">Documentary</option>
                <option value="Drama">Drama</option>
                <option value="Family">Family</option>
                <option value="Romance">Romance</option>
                <option value="War">War</option>
                <option value="Science Fiction">Science Fiction</option>
                {/* <!-- Add more options as needed --> */}
              </select>
            </div>



            <div class="mb-3">
              <label for="rating" class="form-label" style={{ color: 'black' }}>
                Imdb Rating:
              </label>
              <input onChange={handleInput}
                type="text"
                class="form-control"
                id="rating"
                name="rating"
                required
              />
            </div>
            <div class="mb-3">
              <label for="fposter" class="form-label" style={{ color: 'black' }}>
                Front Poster:
              </label>
              <input onChange={handleInput}
                type="text"
                class="form-control"
                id="fposter"
                name="fposter"
                
              />
            </div>
            <div class="mb-3">
              <label for="bposter" class="form-label" style={{ color: 'black' }}>
                Back Poster:
              </label>
              <input onChange={handleInput}
                type="text"
                class="form-control"
                id="bposter"
                name="bposter"
                
              />
            </div>
            
            {/* type submit deya lagey, eita bootstrap er function */}

            <button type="submit">Submit</button>
          </form>

          {/* <!-- "Don't have an account?" link and "Register" button --> */}
          </div>
        </div>
      </div>
    </div>
  );
}
