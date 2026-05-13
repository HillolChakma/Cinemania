import React from 'react'
import "./ProfilePage.css"
export default function ProfilePage() {

    function showWatchlist() {
        document.getElementById("watchlistDiv").style.display = "block";
        document.getElementById("favouriteListDiv").style.display = "none";
      }
    
      function showFavouriteList() {
        document.getElementById("watchlistDiv").style.display = "none";
        document.getElementById("favouriteListDiv").style.display = "block";
      }


  return (
    <div>
      <div class="container">
  <div class="profile-container">
    {/* <!-- Profile Card --> */}
    <div class="profile-card">
      <img src="https://via.placeholder.com/150" alt="Profile Picture" class="profile-img"/>
      <div class="profile-info">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Gender:</strong> Male</p>
        <p><strong>Country:</strong> United States</p>
        {/* <!-- Buttons --> */}
        <button class="btn btn-primary btn-profile" onclick="showWatchlist()">Watchlist</button>
        <button class="btn btn-primary btn-profile" onclick="showFavouriteList()">Favourite List</button>
        <button class="btn btn-success btn-profile">Subscription</button>
      </div>
    </div>
    {/* <!-- Extra Info Div (Initially Hidden) --> */}
    <div class="extra-info" id="watchlistDiv">
      <h3>Watchlist</h3>
      {/* <!-- Content for Watchlist goes here --> */}
    </div>
    <div class="extra-info" id="favouriteListDiv">
      <h3>Favourite List</h3>
      {/* <!-- Content for Favourite List goes here --> */}
    </div>
  </div>
</div>

    </div>
  )
}
