import '../App.css';
import { useState, useEffect } from 'react';
// import { Route, useParams } from 'react-router-dom'
import Add from './Add';
// import Edit from './Edit';
// import Delete from './Delete';
import axios from 'axios';
import AlbumModal from './AlbumModal';
import ModalRoot from '../modules/modals/components/ModalRoot';
import ModalService from '../modules/modals/services/ModalService';

export default function Reviews() {
    
    const [reviews, setReviews] = useState([]);

    const addModal = () => {
        ModalService.open(AlbumModal);
    }

    console.log(reviews);

    const getReviews = () => {
        axios.get('http://localhost:3000/reviews').then((res) => {
          setReviews(res.data);
        });
      };
      useEffect(() => {
        getReviews();
      }, [reviews.join(",")]);
      
      console.log(reviews);

      return (
    
        <div className="App">
        
        <Add reviews={reviews} setReviews={setReviews} />
        
          <div className="reviews">
            {reviews.map((item) => {
              return (
                <div>
                    <button id="btn-blue" onClick={ addModal }>
                      <h5>Artist: <p>{item.artist}</p></h5>
                      <h5>Album: <p>{item.album_title}</p></h5>
                    </button>
                </div>
              );
            })}
          </div>
        </div>
      );
    }