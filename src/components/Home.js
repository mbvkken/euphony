import '../App.css';
import { useState, useEffect } from 'react';
import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';
import Search from './Search';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {

const [reviews, setReviews] = useState([]);

const getReviews = () => {
  axios.get('http://localhost:3000/reviews').then((res) => {
    setReviews(res.data);
  });
};
useEffect(() => {
  getReviews();
}, [reviews]);

  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{color: 'white'}}>euphony.</h2>
      </header>
      
      
    <Search />
    <Add reviews={reviews} setReviews={setReviews} />
    
      <div className="reviews">
        {reviews.map((item) => {
          return (
            <div className="review">
                <h3>Artist: <p>{item.artist}</p></h3>
                <h3>Album: <p>{item.album_title}</p></h3>
                <h3>Review: <p>{item.album_review}</p></h3>
                <h3>Rating: <p>{item.album_rating}</p></h3>
                <Edit id={item.id} reviews={reviews} setReviews={setReviews} />
                <Delete id={item.id} reviews={reviews} setReviews={setReviews} />
            </div>  
          );
        })}
      </div>
      <button id="btn-red" style={{marginBottom: '40px'}}>
        <Link to='/register' style={{textDecoration: 'none', color: 'white'}}>
          Sign out
        </Link>
      </button>
    </div>
  );
}

export default Home;