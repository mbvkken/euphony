import '../App.css';
import {useState} from 'react';
import Albumdata from './MOCK_DATA.json';


export default function Search() {
    
    const [ searchTerm, setSearchTerm ] = useState('');
    
    return (
        <div className="search">
          
            <input type="text" placeholder="Search by Album Title" 
            onChange={event => {setSearchTerm(event.target.value)}}/>

            {Albumdata.filter((val) => {
                if (searchTerm == '') {
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
    )
}