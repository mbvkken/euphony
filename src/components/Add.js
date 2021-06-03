import '../App.css';
import React from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Add(props) {
    const { register,  handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        addReview(data);
    };

    const addReview = (data) => {
        axios.post('http://localhost:3000/reviews', data).then(() => {
            props.setReviews([
                ...props.reviews,
                {
                    data,
                },
            ]);
        });
    };

    // module.exports = 
    // addReview();

return (
    <form className="add-review" onSubmit={handleSubmit(onSubmit)}>
        <h3 style={{color: 'black'}}>Add Album Review</h3>
        <input 
            type="text" 
            placeholder="Album Title" 
            {...register("album_title", { required: true, maxLength: 40 })} 
        />
        <input 
            type="text" 
            placeholder="Artist" 
            {...register("artist", { required: true, maxLength: 40 })} 
        />
        <input
            type="text"
            placeholder="Review"
            {...register('album_review', { required: true, maxLength: 450 })}
        />
        <input
            type="number"
            placeholder="Rating"
            {...register('album_rating', { required: true, max: 5, min: 0 })}
        />
        <input id="btn" type="submit" />
    </form>
    );
};
