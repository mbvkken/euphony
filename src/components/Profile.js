import '../App.css';
import { useState, useEffect } from 'react';
import Edit from './Edit';
import Delete from './Delete';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Profile() {

const [reviews, setReviews] = useState([]);

const getReviews = () => {
  axios.get('http://localhost:3000/reviews').then((res) => {
    setReviews(res.data);
  });
};
useEffect(() => {
  getReviews();
}, [reviews.join(",")]);

  return (
    <div className="App">
        
        <h1 style={{color: 'black'}}>My Profile</h1>
            
            <button id="btn-red">
                <Link to='/register' style={{textDecoration: 'none', color: 'white'}}>
                    Sign out
                </Link>
            </button>
        
        <h3 style={{color: 'black', marginTop: '50px'}}>My Albums</h3>
        
        <div className="profile-reviews">
            {reviews.map((item) => {
                return (
                <div className="profile-review">
                    <h5>Artist: <p>{item.artist}</p></h5>
                    <h5>Album: <p>{item.album_title}</p></h5>
                    <h5>Review: <p>{item.album_review}</p></h5>
                    <h5>Rating: <p>{item.album_rating}</p></h5>
                    <Edit id={item.id} reviews={reviews} setReviews={setReviews} />
                    <Delete id={item.id} reviews={reviews} setReviews={setReviews} />
                </div>
            );
        })}
      </div>
    </div>
  );
}

export default Profile;