import React, { useState } from "react";
import "../SignIn/SigninCss.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {


  const [values, setvalues]= useState({
    username : '',
    password: ''
})




const navigate = useNavigate();

const handleInput= (event)=>{
     setvalues(prev => ({...prev, [event.target.name]: [event.target.value]})) 
}

const handleSubmit= async (event)=>{
  event.preventDefault();


  try {
    const response = await axios.post("http://localhost:5000/adminlogin", values);
    console.log(response);
    const data = await response.data;
    if(data.success ){
      navigate(`/${values && values.username}/admin`);
    }
  } catch (error) {
    console.error("Error fetching data", error);
  }

}



  return (
    <div style={{ backgroundImage: `url(${require("../SignIn/SignIn.jpg")})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', height: '100vh', overflow: 'hidden' }}>
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
         
        </div>
      </nav>

      {/* // ekhane login page ache  */}
      <div class="container" style={{ justifyContent: 'center', alignItems: 'center', height: '100vh', width: '400px' }}>

        <div class="login-container">
          <h2 class="login-header" style={{ color: 'white' }}>Login</h2>
          {/* ekhane formaction baki */}
          <form action="" method="post"  onSubmit={handleSubmit}>  
            <div class="mb-3">
              <label for="username" class="form-label" style={{ color: 'white' }}>
                Admin Name:
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
              <label for="password" class="form-label" style={{ color: 'white' }}>
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

        </div>
      </div>
    </div>
  );
}
