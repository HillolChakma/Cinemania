import axios from "axios";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./MoviePage.css";
import Profile from '../Profile/Profile';
import{Container, Row , Col} from 'react-bootstrap'
import {FaStar} from 'react-icons/fa'
//useparam url theke niye nei
import CircularImageWithName from './CircularImageWithName';
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';

export default function MoviePage() {
  const [currentMovie, setcurrentMovie] = useState();
  const { id } = useParams();
  const { username } = useParams();
  const {moviename } = useParams();
  //data dibo id diye ekhon data gulo nibo

  //FOR REVIEW
  const[reviews , setReviews]= useState([]);
  const[myreview , setMyReview]= useState([]);
  const[oneReview, setOneReview]= useState([]);

  const [avail, setavail] =useState(true);

  //FOR GENRE
  const[currentGenre, setcurrentGenre] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  // const movie = useRef(null)

 //for actor
 const[actors, setcurrentactors] = useState();
  const [isVisibleActor, setIsVisibleActor] = useState(false);
  const toggleVisibilityActor = () => {
    setIsVisibleActor(!isVisibleActor);
  };

  const onDelete= async (event)=>{
    try{
    event.preventDefault();
    const deleteitems = {
      username: username,
      id: values.id,
    };

    const response = await axios.post("http://localhost:5000/reviewdelete", deleteitems);
    console.log(response);
    const data = await response.data;

    if(data && data.success ){
      console.log('in the if'); 
      navigate(`/${username}/movie/${id}/${moviename}`);
       window.location.reload();
    }
  } catch (error) {
    console.error("Error fetching data", error);
  }

    
  }

  const [rating, setRating]=useState(null);
  const [hover, setHover] =useState(null)

  const navigate = useNavigate();

  const [values, setvalues]= useState({
    rating: '',
    userComment: '',
    id: id,
    username: username
})
  const handleInput= (event)=>{
    setvalues(prev => ({...prev, [event.target.name]: [event.target.value]})) 
}
const [IsReviewSuccess , setIsReviewSuccess] = useState();

const onSubmitclick= async (event)=>{
  event.preventDefault();
  try {
    console.log(values);
    
    const hillol = {
      id: values.id,
      username: username,
      userComment: values.userComment[0],
      rating: String(rating)
    };

    console.log(hillol);

    const response = await axios.post("http://localhost:5000/reviewadd", hillol);
    console.log(response);
    setIsReviewSuccess(response);
    const data = await response.data;

    if(data && data.success ){
      console.log('in the if'); 
      navigate(`/${username}/movie/${id}/${moviename}`);
       window.location.reload();
    }
  } catch (error) {
    console.error("Error fetching data", error);
  }

}

//watcchlist and favourite list
const [favList, setFavList] = useState();
const [watchList, setWatchList] = useState();
const [whichone, setwhichone] = useState();

const handleToggleFavList = () => {
  setFavList(!favList);
  let newWhichone;
  if(favList===true){
    newWhichone="3";
  }else{
    newWhichone="1";
  }
  addorRemove( newWhichone);
};

const handleToggleWatchList = () => {
  setWatchList(!watchList);
  let newWhichone;
  if(watchList===true){
    newWhichone="4"
  }else{
    newWhichone="2"
  }
  addorRemove(newWhichone);
};
const addorRemove = async (newWhichone) => {
  try{
    const addordelete = {
      var: String(newWhichone),
      username: String(username),
      id: String(id)
    };
   console.log(addordelete)
    const response = await axios.post("http://localhost:5000/adddeletelist", addordelete);

  }catch(error) {
    console.error("Error fetching data", error);

  }

}

//IS ADMIN OR NOT
const [isadmin , setisadmin] = useState(false);

const onDeleteforAdmin= async()=>{
  try {
    const response = await axios.post("http://localhost:5000/deleteforadmin", {
      id: id,
    });
    
    if(response.data.success===true){
      navigate(`/${username}/homepage`)
    }
    
  } catch (error) {
    console.error("Error fetching data", error);
  }

}

const [issubs, setissubs]= useState(false);
const gohall=()=>{
  navigate(`/${id}/hall`)
}
  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.post("http://localhost:5000/isusersubs", {
          username: username
        });
        
        if(response.data.answer === true){
           setissubs(true);
        }
        
      } catch (error) {
        console.error("Error fetching data", error);
      }
      
      try {
        const response = await axios.post("http://localhost:5000/MoviePage", {
          id: id,
          username: username
        });
        console.log(response.data.oneMovie.rows[0]);
        // movie.current = response.data.oneMovie.rows; //console dekhe dekhe array banay ar useref use kori usestate bal
        setcurrentMovie(response.data.oneMovie.rows[0]);
        // console.log(movie.current[12]);
        if(String(username)==='ADMIN'){
          setisadmin(true);
        }
        
      } catch (error) {
        console.error("Error fetching data", error);
      }

      try {
        const response = await axios.post("http://localhost:5000/getfav", {
          id: id,
          username: username
        });

        console.log(response.data);
        if(response.data.answer===true){
          setFavList(true);
        }
        else{
          setFavList(false)
        }

        const response2 = await axios.post("http://localhost:5000/getwatch", {
          id: id,
          username: username
        });

        console.log(response2.data);
        if(response2.data.answer===true){
          setWatchList(true);
        }
        else{
          setWatchList(false)
        }
        //console.log(response.data.oneMovie);
        // movie.current = response.data.oneMovie.rows; //console dekhe dekhe array banay ar useref use kori usestate bal
      
        // console.log(movie.current[12]);
        
      } catch (error) {
        console.error("Error fetching data", error);
      }


     // this is for the moviegenre
      try {
        const response = await axios.post("http://localhost:5000/MovieGenre", {
          id: id,
        });
        console.log(response.data.oneMovie.rows);
        // movie.current = response.data.oneMovie.rows; //console dekhe dekhe array banay ar useref use kori usestate bal
        setcurrentGenre(response.data.oneMovie.rows);
        // console.log(movie.current[12]);
        //console.log(currentMovie[12]);
      } catch (error) {
        
        console.error("Error fetching data from genre", error);
      }

      try {
        const response = await axios.post("http://localhost:5000/MovieActors", {
          id: id,
        });
        console.log(response.data.oneMovie.rows);
        // movie.current = response.data.oneMovie.rows; //console dekhe dekhe array banay ar useref use kori usestate bal
        setcurrentactors(response.data.oneMovie.rows);
        // console.log(movie.current[12]);
        //console.log(currentMovie[12]);
      } catch (error) {
        console.error("Error fetching data from actors", error);
      }

      //for review
      try {
        const response = await axios.post("http://localhost:5000/reviews", {
          id: id,
        });
        console.log(response.data.oneMovie.rows);
        setReviews(response.data.oneMovie.rows);
      } catch (error) {
        console.error("Error fetching data from reviews", error);
      }


      //for my review
      try {
        const response = await axios.post("http://localhost:5000/myreview", {
          username: username,
          id: id
        });
        if (response.data.oneMovie && response.data.oneMovie.rows && response.data.oneMovie.rows.length > 0) {
          console.log(response.data.oneMovie.rows[0]);
          setMyReview(response.data.oneMovie.rows[0]);
        } else {
          setavail(false);
          console.log("No reviews found for this user and movie ID.");
          // Handle the case when no reviews are found
        }

        
      } catch (error) {
        console.error("Error fetching data from my reviews", error);
      }

    };



    fetchData();
  }, [id]); // Added id to the dependency array

  return (
    // <div>
    //   <h1>{<h1>{currentMovie && currentMovie[12]}</h1>}</h1>{" "}
    // </div>

     <div style={{ width:'100%',height: '100%' }}>
       <Container>
        <div className="movie">    
        <div className="movie__intro">
            <img className="movie__backdrop" src={currentMovie && currentMovie[11]} />
        </div>
        <div style={{position:'absolute',top: 800, left: 1000 }}>
        <div>
            <button
                onClick={handleToggleFavList}
                style={{ backgroundColor: favList ? 'red' : 'green' } }
            >
                {favList ? 'Remove from Fav List' : 'Add to Fav List'}
            </button>
            <button
                onClick={handleToggleWatchList}
                style={{ backgroundColor: watchList ? 'red' : 'green' }}
            >
                {watchList ? 'Remove from Watch List' : 'Add to Watch List'}
            </button>
      </div>
    </div>
        <div className="movie__detail">
            <div className="movie__detailLeft">
                <div className="movie__posterBox">
                    <img className="movie__poster" src={currentMovie && currentMovie[12]} />
                </div>
            </div>
            <div className="movie__detailRight">
                <div className="movie__detailRightTop">
                    <div className="movie__name">{currentMovie ? currentMovie && currentMovie[1]: ""}</div>
                    <div className="movie__tagline">{currentMovie ? currentMovie && currentMovie[1] : ""}</div>
                    <div className="movie__rating">
                        {currentMovie ? currentMovie && currentMovie[5]: ""} <i class="fas fa-star" />
                        {/* <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span> */}
                    </div>
                    <div className="movie__runtime">{currentMovie ? currentMovie && currentMovie[3] + " mins" : ""}</div>
                    <div className="movie__releaseDate">{currentMovie ? "Release date: " + currentMovie && currentMovie[5] : ""}</div>
               
                </div>
                <div className="movie__detailRightBottom">
                    <div className="synopsisText">Synopsis</div>
                    <div className="syntext">{currentMovie ?currentMovie && currentMovie[4] : ""}</div>
                </div>

            </div>
        </div>
        <div style={{position:'absolute',top: 700, left: 1000 }} >
            <Button className="btn2" onClick={gohall}>
            Now Showing
          </Button>
            </div>

    </div>

    
</Container>
    
<div className="container">
   
    <div class="col-md-6">
       <div class="row">
          <div class="col-md-6">
            
            <div className="container">
            
            <div className="genre-container">
            <div className="synopsisText">Genre:</div>
                {currentGenre && currentGenre.map((row, index) => (
                  <div key={index} className="genre-row">
                    {Object.values(row).map((value, i) => (
                      <div key={i} className="genre-cell">
                        {value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
         
            </div>
          </div>

          <div class="col-md-5">
              {/* Actors */}
              <div className="containerForActor">
              <div className="synopsisText">Actor:</div>
                  <div className="container mt-5">
                    <div className="row ">
                      {actors && actors.map((actor, index) => (
                        <div className="col-md-4" key={index}>
                          <CircularImageWithName imageUrl={actor[1]} name={actor[0]} />
                        </div>
                      ))}
                    </div>
                  </div>
               
              </div>
            
          </div>

       </div>

    </div>

 


    <div className="deleteforadmin">
                      {isadmin &&(isadmin===true) ? (
                          
                          <div className="card mb-3 custom-card">
                            <button className="btn btn-danger" onClick={onDeleteforAdmin}>
                              Delete This Movie
                            </button>
                        </div>
                        
                        
                        ) : (
                          <div></div>
                        )}
      </div>




    

   </div>

  
  
    

    
  <Container style={{ width:'120%',height: '100%' }}>
  <div class="container mt-6"  style={{ width:'100%',height: '100%' }}>
  <div class="row">
    
    <div class="col-md-6">
      <div className="myreview">
         <h4>My Review</h4>
                      {myreview.length > 0 ? (
                          
                          <div className="card mb-3 custom-card">
                          <div className="card-body">
                            <h5 className="card-title">{username}</h5>
                            <FaStar className="star" size={20} color='ffc107'></FaStar><a style={{color:'black'}}>{myreview[2]}</a>
                            <p className="card-text">{myreview[1]}</p>
                            <button className="btn btn-danger" onClick={onDelete}>
                              Delete
                            </button>
                          </div>
                        </div>
                        
                        
                        ) : (
                          <p>No reviews found.</p>
                        )}
      </div>
      <div class="review-box">
         <h3>Reviews</h3>
         {reviews.length > 0 ? (
                          
                          reviews.map((review) => (
                            <div className="card mb-3">
                              <div className="card-body">
                                  <h5 className="card-title">{review[2]}</h5>
                                  <FaStar className="star" size={20} color='ffc107'></FaStar><a style={{color:'black'}}>{review[1]}</a>
                                  <p className="card-text">{review[0]}</p>
                              </div>
                            </div>
                          ))
                        
                        
                        ) : (
                          <p>No reviews found.</p>
                        )}


        {/*<div class="review">
          <h5>John Doe</h5>
          <p>This is a great product!</p>
          <div class="stars" >
            ★★★★★
          </div>
        </div>
        <div class="review">
          <h5>Jane Smith</h5>
          <p>Could be better.</p>
          <div class="stars" >
            ★★★☆☆
          </div>
        </div> */}

                        

      </div>
    </div>
    <div class="col-md-6">





    {issubs && issubs===true ? (


                                <div class="user-review-box">
                                <h3>Add Your Review</h3>
                                <form>
                                  
                                <div className="mb-3"style={{  left: '10px', top: '10px', padding: '5px' }}>
                                  
                                  <label ><p>Rating</p></label>
                                  
                                    <div >  
                                      {[...Array(10)].map((star, index) =>{
                                        const currentRating= index+1
                                            return(
                                              <label>
                                                <input
                                                type="radio"
                                                name="rating"
                                                id="rating"
                                                value={currentRating}
                                                onClick={()=> setRating(currentRating)}
                                                onChange={handleInput}

                                                />
                                                <FaStar className="star" size={50} color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                                onMouseEnter={()=>setHover(currentRating)}
                                                onMouseLeave={()=> setHover(null)}
                                                />
                                              </label>
                                            );      
                                      })}
                                    </div>
                                </div>

                                  <div class="mb-3">
                                    <label for="userComment" >Comment</label>
                                    <textarea 
                                    class="form-control"
                                    id="userComment"
                                    rows="3"
                                    name="userComment"
                                    onChange={handleInput}
                                    required></textarea>
                                  </div>
                                  <button onClick={onSubmitclick} type="submit"  class="btn btn-primary">Submit</button>
                                </form>
                                </div>

                        
                        ) : (
                          <p>You Need to Subscribe to rate movie</p>
                        )}          
      
    </div>
  </div>
</div>

  </Container>

    </div>
  );
}
