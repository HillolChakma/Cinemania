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
  const [values, setvalues] = useState({
    fname: '',
    lname: '',
    dob: '',
    email: '',
    country: '',
    gen: '',
    username: '',
    password: ''
  })

  const navigate = useNavigate();

  //input er value guloke ekhane set kore
  const handleInput = (event) => {
    setvalues(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  // register e click korle eti chalu hoi
  const handleSubmit = (event) => {
    event.preventDefault();


    /////sh----------------
    const formattedDate = formatDate(values.dob);

    // Create a new object with the formatted date
    const formattedValues = {
      ...values,
      dob: formattedDate,
    };
    /////sh-----------------

    // er sahajje amra data pathai 5000/signup api e res lagey na... server e lagey
    //erpor navigate kore onno page e
    axios.post("http://localhost:5000/signup", formattedValues)
      .then(res => {
        navigate('/');
      })
      .catch(err => console.log(err));

  }
  // Helper function to format date to 'DD-MM-YYYY'
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }


  ///////sh-------------
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    setShowTitle(true);
  }, []);

  return (
    <div style={{ backgroundImage: `url(${require("../SignIn/SignIn.jpg")})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', height: '100vh', overflow: 'hidden' }}>
      {/* <!-- upper layout--> */}

      {/* <!-- Navigation Bar --> */}
      

      {/* <!-- ekhane login page ache --> */}
      <div className="row">
        <div className="col-md-6 d-flex  justify-content-center" style={{ marginLeft: '150px' }}>
          <div class="container d-flex  align-items-center" style={{ height: '85%' }}>
            <div class="login-container" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '8px', maxWidth: '500px' }}>
              <h2 class="login-header" style={{ color: 'white', textAlign: 'center' }}>Register</h2>

              {/* form er onsubmit deya lagey + function call hobey */}

              <form action="" method="post" onSubmit={handleSubmit}>
                <div class="row mb-3">
                  <div className="col-md-6">
                    {/* First Name */}
                    <label for="fname" class="form-label" style={{ color: 'white' }}>
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
                  <div className="col-md-6">
                    {/* Last Name */}

                    <label for="lname" class="form-label" style={{ color: 'white' }}>
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
                </div>
                <div class="row mb-3">
                  <div className="col-md-6">
                    <label for="dob" class="form-label" style={{ color: 'white' }}>
                      Date of Birth:
                    </label>
                    <input onChange={handleInput}
                      type="date"
                      class="form-control"
                      id="dob"
                      name="dob"
                      autocomplete="off"
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="email" class="form-label" style={{ color: 'white' }}>
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
                </div>
                <div class="row mb-3">
                  <div className="col-md-6">
                    <label for="country" class="form-label" style={{ color: 'white' }}>
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

                  <div className="col-md-6">
                    <label for="gen" class="form-label" style={{ color: 'white' }}>
                      Gender:
                    </label>
                    <select onChange={handleInput}
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
                </div>

                <div class="row mb-3">
                  <div className="col-md-6">
                    <label for="username" class="form-label" style={{ color: 'white' }}>
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
                  <div className="col-md-6">
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
                </div>
                {/* type submit deya lagey, eita bootstrap er function */}

                <button type="submit" class="btn btn-primary">Register</button>
              </form>

              {/* <!-- "Don't have an account?" link and "Register" button --> */}
              <div class="register-link">
                <p style={{ color: 'white' }}>
                  Have an account?{" "}
                  <Link to='/' >Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*------------------------------------------*/}
        <div className="col-md-6 " style={{ marginRight: '50px', marginTop: '200px', position: 'relative', zIndex: '5', backgroundColor: 'rgba(0, 0, 0, 0.7)', overflow: 'visible', top: '0', left: '0' }}>
  <h2 className="login-header" style={{ color: 'white', textAlign: 'center', margin: '0' }}>
    <span className={`typing-title ${showTitle ? "show" : ""}`}>
      Why Join Us?
    </span>
  </h2>
</div>

      </div>
    </div>
  );
}

export default Signup;
