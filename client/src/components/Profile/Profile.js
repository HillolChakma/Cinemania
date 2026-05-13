import React, { useEffect, useRef, useState } from 'react';
import "./Profile.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cards from "../Card/Card.js"
import Movie from './Movie.js';

const UserProfile = () => {
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showFavouriteList, setShowFavouriteList] = useState(false);
  
  const { username } = useParams();
  const [currentProfile , setCurrentProfile]= useState();

  const [favlist , setFavList]= useState();
  const [watchlist , setWatchList]= useState();
  
  const toggleWatchlist = () => {
    setShowWatchlist(!showWatchlist);
    setShowFavouriteList(false);
  };

  const toggleFavouriteList = () => {
    setShowFavouriteList(!showFavouriteList);
    setShowWatchlist(false);
  };
  const navigate = useNavigate();
  
  const onSubClick=()=>{
    navigate(`/${username}/subscribe`);
  }
  const { searchId } = useParams();
    const { searchStr } = useParams();



    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    const [values, setvalues] = useState({
      searchId: '1',
      searchStr: ''
  })

  
  
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
            const response = await axios.post("http://localhost:5000/profile", {
              username: username
            });
            console.log(response.data.oneProfile.rows[0])
            setCurrentProfile(response.data.oneProfile.rows[0])

            const responsefav= await axios.post("http://localhost:5000/getfavmovie", {
              username: username
            });
            console.log(responsefav);
            setFavList(responsefav.data.result.rows);
            console.log(favlist && favlist);
           
            const responsewatch= await axios.post("http://localhost:5000/getwatchmovie", {
              username: username
            });
            console.log(responsewatch);
            setWatchList(responsewatch.data.result.rows);
            console.log(watchlist && watchlist)
          } catch (error) {
            console.error("Error fetching data from my reviews", error);
          }



    };
    fetchData();
  }, [username]); // Added id to the dependency array
  return (
    <div className="container">
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
                style={{position:'absolute', left: '830px',width:'10%',height: '50%' }}
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
      <div className='row'>
        <div class="col-md-6">
            <div className="profile-container">
                          <div className="profile-card"style={{backgroundColor: '#34495E '}}>
                              <img src="https://via.placeholder.com/150" alt="Profile Picture" className="profile-img" />
                              <div className="profile-info" style={{backgroundColor:'#34495E '}}>
                                  <p><strong>Name:</strong> {currentProfile && (currentProfile[3]+ ' ' + currentProfile[4])}</p>
                                  <p><strong>Email:</strong> {currentProfile && currentProfile[7]}</p>
                                  <p><strong>Gender:</strong> {currentProfile && currentProfile[6]}</p>
                                  <p><strong>Country:</strong> {currentProfile && currentProfile[5]}</p>
                                  <button className="btn btn-primary btn-profile" onClick={toggleWatchlist}>Watchlist</button>
                                  <button className="btn btn-primary btn-profile" onClick={toggleFavouriteList}>Favourite List</button>
                                  <button onClick={onSubClick}className="btn btn-success btn-profile">Subscription</button>
                              </div>
                          </div>
            </div>
        </div>

        <div class="col-md-6" >
        {showFavouriteList===true ? (
                                      <div className="card mb-3"style={{backgroundColor: '#121212'}}>
                                          <p style={{color: 'white'}}><h4>Favourite List</h4></p>
                                          <div className="movie__list">
                                              <div className="list__cards">
                                                  {
                                                      favlist.map(movie => (
                                                          <Cards movie={movie} username={username}/>
                                                      ))
                                                  }
                                              </div>
                                          </div>
                                      </div>
                                    ) : (
                                      <p></p>
                                    )}
        {showWatchlist===true ? ( 
                                        <div className="card mb-3">
                                          <p style={{color: 'black'}}><h4>Watchlist</h4></p>
                                          <div style={{backgroundColor: '#212529'}}>
                                            {watchlist.map((movie, index) => (
                                              <Movie key={index} movie={movie} index={index} />
                                            ))}
                                          </div>
                                        </div>
                                    ) : (
                                      <p></p>
                                    )}

                   
        

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
