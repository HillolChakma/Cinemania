import React from 'react';
import { Link, useParams } from 'react-router-dom';
import "./Admin.css"
function AdminMenu() {
    const {username}= useParams();
    return (
        <div className="OUTER">

            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <img class="logo" src={require("../HomePage/logo2.png")} alt="logo" width={200} height={50} />
                    <h2 class="admin-menu">Admin Menu</h2>
                </div>
            </nav>

            <div className="page-buttons2">
            <div><Link to="/insertmovie" className="btn2 btn-primary">insert movie</Link></div>
            <div><Link to={`/${username}/homepage`} className="btn2 btn-primary">delete movie</Link></div>
            <div><Link to={`/${username}/viewlogs`} className="btn2 btn-primary">view logs  </Link></div>
                {/* Adjust 'to' prop with the actual paths of your pages */}
            </div>

        </div>
        
    );
}

export default AdminMenu;
