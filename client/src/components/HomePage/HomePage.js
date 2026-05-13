import React, { useEffect, useRef, useState } from "react";
import "./HomePage.css"
import { Link, useNavigate, useParams } from "react-router-dom";
// usestate use hoi data const variable front end ei set er jonno front end e rakhar jonno
//useeffect use hoi backend theke data fetch er jonno
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Cards from "../Card/Card.js"

function HomePage() {

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
  const { username } = useParams();

  const [backenddata, setbackenddata] = useState([{}]);
  const [backenddataCards, setbackenddataCards] = useState([{}]);


  const handleSearch= (event)=>{
    event.preventDefault();

    // er sahajje amra data pathai 5000/signup api e res lagey na... server e lagey
    //erpor navigate kore onno page e
    
      navigate(`/search/${username}/${values&& values.searchId}/${values&&values.searchStr}`);

}  

  useEffect(()=>{
    fetch("/homepage").then(
      response=> response.json()
    ).then(data=>{
      setbackenddata(data.movies)
      console.log(data.movie)})
  },[])

  useEffect(()=>{
    fetch("/homepage2").then(
      response=> response.json()
    ).then(data=>{
      setbackenddataCards(data.movies)})
  },[])

  const onprofileclick= (event)=>{
    event.preventDefault();

    // er sahajje amra data pathai 5000/signup api e res lagey na... server e lagey
    //erpor navigate kore onno page e
    
      navigate(`/${username}/profile`);

}  

  return (
    <div style={{ position:"absolute", left: '10px', top: '10px'}}>
      {/* navbar suru */}

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark"  >
        <div class="container-fluid">
          <a class="navbar-brand" ><Link to ={`${username}/homepage`}>
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
              <Link to={`/${username}/profile`} className="nav-link active" aria-current="page">
                  Profile
                </Link>
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

      {/* nav bar sesh */}


      {/* transation er kaj suru */}

      
          <div className="poster">
            <Carousel
                showThumbs={true}
                autoPlay={true}
                transitionTime={1}
                infiniteLoop={true}
                showStatus={false}
            >
              {
                   backenddata.slice(0, 20).map((movie)=>(
                    //<span>{movie[1]}</span>   //karon 1 index e movie name ache 
                    <Link style={{textDecoration:"none",color:"white"}} to={`/${username}/movie/${movie[0]}/${movie[1]}`} >
                    <div className="posterImage">
                        <img src={movie[12]}  />
                    </div>
                    <div className="posterImage__overlay">
                        <div className="posterImage__title">{movie ? movie[1]: ""}</div>
                        <div className="posterImage__runtime">
                            {movie ? movie[2] : ""}
                            <span className="posterImage__rating">
                                {movie ? movie[5] :""}
                                <i className="fas fa-star" />{" "}
                            </span>
                        </div>
                        <div className="posterImage__description">{movie ? movie[4] : ""}</div>
                    </div>
                </Link>
                    ))

              }
            </Carousel>
          </div>


      
        {/* transation er kaj sesh */}


      
      
      <div className="movie__list">
          
            <div className="list__cards">
                {
                    backenddataCards.slice(1,100).map(movie => (
                        <Cards movie={movie} username={username}/>
                    ))
                }
            </div>
        </div>
      

    </div>
  );
}

export default HomePage;
