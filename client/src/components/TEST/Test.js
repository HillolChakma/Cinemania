import React, { useState } from "react";
import {FaStar} from 'react-icons/fa'
import './Test.css'
const SingleComment = ({ userName, comment, onDelete }) => {
  const [rating, setRating]=useState(null);
  const [hover, setHover] =useState(null)
  return (
    <div style={{ position: "absolute", left: '10px', top: '10px', backgroundColor: 'black', padding: '5px' }}>
      {[...Array(10)].map((star, index) =>{
        const currentRating= index+1
             return(
              <label> Rating
                <input
                 type="radio"
                 name="rating"
                 value={currentRating}
                 onClick={()=> setRating(currentRating)}

                />
                <FaStar className="star" size={50} color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onMouseEnter={()=>setHover(currentRating)}
                onMouseLeave={()=> setHover(null)}
                />
              </label>
             );      
      })}
      
    </div>
  );
};

export default SingleComment;
