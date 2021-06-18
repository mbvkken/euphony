import '../App.css';
import Modal from "../modules/modals/components/Modal";
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Edit from './Edit';
import Delete from './Delete';
import axios from 'axios';


export default function AlbumModal(props) {

const [reviews, setReviews] = useState([]);

useEffect(() => {
  const getReviewsById = async () => {
    const url = `http://localhost:3000/reviews/${reviews}`;
    const result = await axios.get(url);
    setReviews(result.data)
    console.log(result.data, 'test');
  } 
  getReviewsById();
}, []);

console.log(reviews);

  return (
    <Modal>
      {reviews.map((item) => {
          return (
            <div className="review">
              
              <div className="closing-btn">
              <button id="close-btn" onClick={ props.close }>X</button>
              </div>

                <h5>Artist:</h5> <p>{item.artist}</p>
                <h5>Album:</h5> <p>{item.album_title}</p>
                <h5>Review:</h5> <p>{item.album_review}</p>
                <h5>Rating:</h5> <p>{item.album_rating}</p>
                <Edit id={item.id} reviews={reviews} setReviews={setReviews} />
                <Delete id={item.id} reviews={reviews} setReviews={setReviews} />
                
            </div>  
          );
        })}        
      </Modal>
  );
}