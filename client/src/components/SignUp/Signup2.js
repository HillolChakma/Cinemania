import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// useeffect diye value and setvalue nilam
//ekhane value sob save rakhbo
//erpr login er type= submit dibo
//form e onsubmit korbo jeta click korle function create hoi
// function handlesubmit banalam

//intput gular jonno onchange ekta type nilam
// jaa arekta function active kore HandleInput
// handleinput kore holo name ar value map kore setvalues use kore values set kore dei
//map er jonno input e name='(values er naam)'

//form e action-='' ebabe deya lagey na dile sei page e theke jai abar dileo sei page e choley jai jaa amra function e korte chacchilam navigate valomoto usekorar jnno 
// respost pailei korte parbo

function Signup() {

  // onek value eksatey rakhar jonno
const [values, setvalues]= useState({
    fname: '',
    lname:'',
    dob : '',
    email: '',
    country: '',
    gen: '',
    username: '',
    password : ''
})

const navigate = useNavigate();

//input er value guloke ekhane set kore
const handleInput= (event)=>{
     setvalues(prev => ({...prev, [event.target.name]: event.target.value})) 
}

// register e click korle eti chalu hoi
const handleSubmit= (event)=>{
    event.preventDefault();

    // er sahajje amra data pathai 5000/signup api e res lagey na... server e lagey
    //erpor navigate kore onno page e
    axios.post("http://localhost:5000/signup", values)
    .then(res=> {
      navigate('/');
    })
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
      <div class="container">
        <div class="login-container">
          <h2 class="login-header" style={{ color: 'black' }}>Register</h2>

          {/* form er onsubmit deya lagey + function call hobey */}

          <form action ="" method="post" onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for="fname" class="form-label" style={{ color: 'black' }}>
                First Name:
              </label>
              <input onChange={handleInput}
                type="text"
                class="form-control"
                id="fname"
                name="fname"
                required
              />
            </div>
            <div class="mb-3">
              <label for="lname" class="form-label" style={{ color: 'black' }}>
                Last Name:
              </label>
              <input onChange={handleInput}
                type="text"
                class="form-control"
                id="lname"
                name="lname"
                required
              />
            </div>
            <div class="mb-3">
              <label for="dob" class="form-label" style={{ color: 'black' }}>
                Date of Birth:
              </label>
              <input onChange={handleInput}
                type="text"
                class="form-control"
                id="dob"
                name="dob"
                autocomplete="off"
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label" style={{ color: 'black' }}>
                Email:
              </label>
              <input onChange={handleInput}
                type="text"
                class="form-control"
                id="email"
                name="email"
                autocomplete="off"
              />
            </div>
            <div class="mb-3">
              <label for="country" class="form-label" style={{ color: 'black' }}>
                Country:
              </label>
              <select onChange={handleInput}
                class="form-select"
                id="country"
                name="country"
                data-live-search="true"
              >
                {/* <!-- Add options for each country --> */}
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
                <option value="bangladesh">Bangladesh</option>
                <option value="india">India</option>
                <option value="korea">Korea</option>
                <option value="china">China</option>
                {/* <!-- Add more options as needed --> */}
              </select>
            </div>

            <div class="mb-3">
              <label for="gen" class="form-label" style={{ color: 'black' }}>
                Gender:
              </label>
              <select onChange={ handleInput}
                class="form-select"
                id="gen"
                name="gen"
                data-live-search="true"
              >
                {/* <!-- Add options for each country --> */}
                <option value="male">Male</option>
                <option value="female">Female</option>
                {/* <!-- Add more options as needed --> */}
              </select>
            </div>

            <div class="mb-3">
              <label for="username" class="form-label"style={{ color: 'black' }}>
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
            {/* type submit deya lagey, eita bootstrap er function */}

            <button type = "submit" >Register</button>
          </form>

          {/* <!-- "Don't have an account?" link and "Register" button --> */}
          <div class="register-link">
            <p style={{ color: 'black' }}>
              Have an account?{" "}
              <a href="#">click here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
