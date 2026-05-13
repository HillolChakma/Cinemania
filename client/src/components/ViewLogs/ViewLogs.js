import React, { useEffect, useState } from 'react'
 // Import CSS file
import { Button, Form } from 'react-bootstrap';
import '../Subscription/Subscription.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Logs from './Logs.js';

export default function ViewLogs() {
    const [userid, setId] = useState('');
    const [logdata, setlogdata] = useState('')
    const [isoneId, setOneId]= useState(false);
    const [logdataall, setlogdataall] = useState('');
const {username}= useParams();
    const handleCheck =async () => {
        try{ 
            setOneId(true)
            const response =await axios.post("http://localhost:5000/getIdlogs", {id: userid});
            console.log(response.data);
            setlogdata(response.data.result.rows);
        }catch(error) {
          console.error("Error fetching data", error);
      
        }
  
    };

    const handleCheckAll =async () => {
    
        try{
            setOneId(false);
        }catch(error) {
          console.error("Error fetching data", error);
      
        }    
  
    };

    useEffect(() => {
        const fetchData = async () => {
    
            try {
                
                const response2 = await axios.post("http://localhost:5000/getallLogs");
                setlogdataall(response2.data.result.rows);
               
              } catch (error) {
                console.error("Error fetching data from my reviews", error);
              }
    
    
    
        };
        fetchData();
      }, [username]); // Added id to the dependency array
  return (
    <div className='container'>
        
        <div class="col-md-12">
                <div className="subscribe-form">
                        <h3 style={{color: 'black'}}>See Logs</h3>
                        <Form>
                            <Form.Group controlId="formBasicCard">
                            <Form.Label>ENTER ID</Form.Label>
                            <Form.Control type="IdNumber" placeholder="Enter Id Number " value={userid} onChange={(e) => setId(e.target.value)} />
                            </Form.Group>
                            <div className='row'>
                                    <div class="col-md-6">
                                                    <Button variant="primary" type="button" onClick={handleCheck}>
                                                    Check
                                                    </Button>

                                    </div>
                                    <div class="col-md-3">
                                            <Button variant="primary" type="button" onClick={handleCheckAll}>
                                            Check For All
                                            </Button>
                                        
                                    </div>
                            </div>  
                        </Form>
                </div>
        </div>

        <div class="col-md-12">
        {isoneId===true ? ( 
                                        <div className="card mb-3">
                                          <p style={{color: 'black'}}><h4>Watchlist</h4></p>
                                          <div style={{backgroundColor: '#212529'}}>
                                            { logdata && logdata.map((logs, index) => (
                                              <Logs key={index} logs={logs} index={index} />
                                            ))}
                                          </div>
                                        </div>
                                    ) : (
                                        <div className="card mb-3">
                                        <p style={{color: 'black'}}><h4>Log Table</h4></p>
                                        <div style={{backgroundColor: '#212529'}}>
                                          { logdataall && logdataall.map((logs, index) => (
                                            <Logs key={index} logs={logs} index={index} />
                                          ))}
                                        </div>
                                      </div>
                                    )}
        </div>
        
      
    </div>
  )
}
