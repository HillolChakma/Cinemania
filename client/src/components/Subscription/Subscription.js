import React, { useEffect, useState } from 'react';
import './Subscription.css'; // Import CSS file
import { Button, Form } from 'react-bootstrap';
import './Subscription.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Subscription() {
  const [subscribed, setSubscribed] = useState(false);
  const [card, setCard] = useState('');
  const [password, setPassword] = useState('');
  const{username}= useParams();
const navigate= useNavigate();
const goback=()=>{

    navigate(`/${username}/profile`)

}
  const handleSubscribe =async () => {
    
      try{
        const values = {
          username: String(username),
        };
       console.log(values)
        const response = await axios.post("http://localhost:5000/makesubscribe", values);
        setSubscribed(true)
      }catch(error) {
        console.error("Error fetching data", error);
    
      }

  };
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.post("http://localhost:5000/getissubscribed", {
              username: username,
            });

            console.log(response.data.answer)

            if(response.data.answer===true){
                setSubscribed(true);
            }
            else{
                setSubscribed(false);
            }
            //console.log(response.data.oneMovie.rows[0]);
            // movie.current = response.data.oneMovie.rows; //console dekhe dekhe array banay ar useref use kori usestate bal
           // setcurrentMovie(response.data.oneMovie.rows[0]);
            // console.log(movie.current[12]);
            
          } catch (error) {
            console.error("Error fetching data", error);
          }
    }

    fetchData();
},[username])

  return (
    <div className="subscription">
      {subscribed ? (
        <div className="subscribed">
            <div className='row'>
            <div class="col-md-6">
            Subscribed
            </div>
            <div class="col-md-6">
            <Button onClick={goback}>
            Go Back
          </Button>
            </div>
            </div>
        </div>
      ) : (
        <div className="subscribe-form">
          <h3 style={{color: 'black'}}>Subscribe</h3>
          <Form>
            <Form.Group controlId="formBasicCard">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="CardNumber" placeholder="Enter Card Number " value={card} onChange={(e) => setCard(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password " value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleSubscribe}>
              Subscribe
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default Subscription;
