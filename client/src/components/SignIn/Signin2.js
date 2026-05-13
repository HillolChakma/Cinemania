import React, { useState } from "react";
import "./SigninCss.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signin() {


  const [values, setvalues]= useState({
    username : '',
    password: ''
})
 

const [currentProfile, setcurrentProfile] = useState();



const navigate = useNavigate();

const handleInput= (event)=>{
     setvalues(prev => ({...prev, [event.target.name]: [event.target.value]})) 
}

const handleSubmit= async (event)=>{
  event.preventDefault();

  // er sahajje amra data pathai 5000/signup api e res lagey na... server e lagey
  //erpor navigate kore onno page e
  // axios.post("http://localhost:5000/signin", values)
  // .then(res=> {
  //   navigate('/homepage');
  // })
  // .catch(err=> console.log(err));

  try {
    const response = await axios.post("http://localhost:5000/signin", values);
    console.log(response);
    setcurrentProfile(response);
    console.log(response);
    const data = await response.data;

    if(data.success ){
      
      navigate(`/${values.username}/homepage`);
    }
  } catch (error) {
    console.error("Error fetching data", error);
  }

}



  return (
    <div>
      {/* //upper layout */}

      {/* Navigation Bar  */}
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

      {/* // ekhane login page ache  */}
      <div class="container">
        <div class="login-container">
          <h2 class="login-header" style={{ color: 'black' }}>Login</h2>
          {/* ekhane formaction baki */}
          <form action="" method="post"  onSubmit={handleSubmit}>  
            <div class="mb-3">
              <label for="username" class="form-label" style={{ color: 'black' }}>
                Username:
              </label>
              <input onChange={handleInput}
                type="text"
                class="form-control"
                id="username"
                name="username"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label" style={{ color: 'black' }}>
                Password:
              </label>
              <input onChange={handleInput}
                type="password"
                class="form-control"
                id="password"
                name="password"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </form>

          {/* // "Don't have an account?" link and "Register" button */}

          <div className="register-link">
            <p style={{ color: 'black' }}>
              Don't have an account?{" "}
              <Link to= '/signup' >Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
