import '../App.css';
import React from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Edit(props) {
    
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        data['id'] = props.id;
        updateReview(data);
    };

    const updateReview = (data) => {
        axios.put('http://localhost:3000/reviews', data).then((res) => {
            props.setReviews(
                props.reviews.map((item) => {
                    return item.id === props.id
                    ? {
                        id: item.id,
                        album_title: item.album_title,
                        album_review: item.album_review,
                        album_rating: item.album_rating,
                    }
                    : item;
                })
            );
        });
    };

return (
    <form className="add-review" onSubmit={handleSubmit(onSubmit)}>
        <h5 style={{color: 'rgb(7, 172, 62)'}}>Edit Review</h5>
        <input
            type="text"
            placeholder="New Review"
            {...register('album_review', { required: true, maxLength: 450 })}
        />
        <input
            type="number"
            placeholder="New Rating"
            {...register('album_rating', { required: true, max: 5, min: 0 })}
        />

        <input id="btn" type="submit" />

    </form>
    );
};