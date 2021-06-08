import '../App.css';
import { useState, useEffect } from 'react';
import axios from  'axios'; 


function Search() {

  const [reviews, setReviews] = useState([]);

  const getReviews = () => {
    axios.get('http://localhost:3000/reviews').then((res) => {
      setReviews(res.data);
      console.log(res.data)
    });
  };
  useEffect(() => {
    getReviews();
  }, []);
      
    
    const [ searchTerm, setSearchTerm ] = useState('');

   
    return (
      <div>
        <div className="search">
          
            <input style={{width: '200px'}}type="text" placeholder="Search by Album Title or Artist" 
            onChange={event => {setSearchTerm(event.target.value)}}/>
            
            {reviews.filter((val) => {
                if (searchTerm === '') {
                  return;
                } else if 
                   (val.album_title.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return val;
                        } else if (val.artist.toLowerCase().includes(searchTerm.toLowerCase())) {
                          return val;
                            }
                      }).map((val, key) => {
                        return <div key={key}>
                                  <p style={{color:"black"}}>{val.artist} : {val.album_title}</p>
                                </div>
                            })} 
        </div>
      </div>
        
    )
}

export default Search;