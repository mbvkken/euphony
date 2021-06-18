import '../App.css';
import { useState } from 'react';
// import { Route, useParams } from 'react-router-dom'
// import Add from './Add';
import Reviews from './Reviews';
// import Edit from './Edit';
// import Delete from './Delete';
// import axios from 'axios';
// import AlbumModal from './AlbumModal';
import ModalRoot from '../modules/modals/components/ModalRoot';
// import ModalService from '../modules/modals/services/ModalService';

function Home() {

const [reviews, setReviews] = useState([]);

  return (
    
    <div className="App">
      <ModalRoot />
      <Reviews reviews={reviews} setReviews={setReviews}/>
    </div>
  );
}

export default Home;