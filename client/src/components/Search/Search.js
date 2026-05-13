import React, { useEffect, useRef, useState } from "react";
import "./Search.css"
import { Link, useNavigate, useParams } from "react-router-dom";
// usestate use hoi data const variable front end ei set er jonno front end e rakhar jonno
//useeffect use hoi backend theke data fetch er jonno
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Cards from "../Card/Card.js"
import axios from "axios";


function Search() {
    const { searchId } = useParams();
    const { searchStr } = useParams();
    const { username } = useParams();


    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    const [values, setvalues] = useState({
      searchId: '1',
      searchStr: ''
  })
  const navigate = useNavigate();
  
  
  const handleInput= (event)=>{
    setvalues(prev => ({...prev, [event.target.name]: event.target.value})) 
  }

    const handleMouseEnter = () => {
        setDropdownOpen(true);
      };
    
      const handleMouseLeave = () => {
        setDropdownOpen(false);
      };
      
    
      const [backenddataCards, setbackenddataCards] = useState([{}]);
    
    
      const handleSearch= (event)=>{
        event.preventDefault();
    
        // er sahajje amra data pathai 5000/signup api e res lagey na... server e lagey
        //erpor navigate kore onno page e
        
          navigate(`/search/${username}/${values&& values.searchId}/${values&&values.searchStr}`);
    
    }  


      useEffect(() => {
        const fetchData = async () => {

            try {
                console.log("hello");
                const response = await axios.post("http://localhost:5000/search", {
                  searchId: searchId,
                  searchStr: searchStr ,
                  username: username
                });

                if (response.data.oneMovie && response.data.oneMovie.rows && response.data.oneMovie.rows.length > 0) {
                  console.log(response.data.oneMovie.rows);
                  setbackenddataCards(response.data.oneMovie.rows)
                  
                } else {
                  
                  console.log("No movies found for this search button.");
                  // Handle the case when no reviews are found
                }
              } catch (error) {
                console.error("Error fetching data from my reviews", error);
              }



        };
        fetchData();
      }, [searchStr]); // Added id to the dependency array
    

  return (
    <div style={{ position:"absolute", left: '10px', top: '10px', width: '98.5%'}}>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark"  >
        <div class="container-fluid">
          <a class="navbar-brand" ><Link to ={`/${username}/homepage`}>
            <img class= "logo" src ={require("./logo2.png")} alt ="logo" width={200} height={50}/></Link>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" ><Link to ={`/${username}/profile`}>
                  Profile
                  </Link></a>
              </li>
              
             
              <li class="nav-item">
                <a class="nav-link disabled">About Us</a>
              </li>
            </ul>
            <form class="d-flex" role="search">
            <div class="mb-3">
              <select onChange={handleInput}
                class="form-select"
                id="searchId"
                name="searchId"
                data-live-search="true"
                style={{position:'absolute', left: '1030px',width:'10%',height: '50%' }}
              >
                
                <option value='1'>Any</option>
                <option value='2'>Movie</option>
                <option value="3">Genre</option>
                <option value="4">Actor</option>
               
                
              </select>
            </div>

              <input onChange={handleInput}
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                id="searchStr"
                name= "searchStr"
              />
              <button onClick={handleSearch} class="btn btn-outline-success" type="submit" style={{ width:'60%',height: '100%' }}>
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>


    
      <p><h3>{`here are the result for ${searchStr}`}</h3></p>

      <div className="movie__list">
          
          <div className="list__cards">
              {
                  backenddataCards.map(movie => (
                      <Cards movie={movie} username={username}/>
                  ))
              }
          </div>
      </div>

    </div>
  )
}

export default Search
