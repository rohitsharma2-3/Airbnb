import React, { useState } from 'react'
import { Rating } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Review = () => {
    let { id } = useParams()
    let navigate = useNavigate()
    const [inputData, setInputData] = useState({
        review: '',
        rating: 0,
    })

    const inputHandler = (e) => {
        const { name, value } = e.target
        setInputData({ ...inputData, [name]: value })
    }

    const handleRatingChange = (_, newValue) => {
        setInputData({ ...inputData, rating: newValue });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:4000/verifiedvilla/review/${id}`, inputData)
            .then(() => {
                setInputData({
                    review: '',
                    rating: 0
                })
                navigate(`/details/${id}`, {
                    state: {
                        showToast: true,
                        message: 'Review added successfully!'
                    }
                })
            })
            .catch((err) => {
                console.log("Erro -> ", err)
            })
    }

    return (
        <>
            {window.localStorage.getItem('auth-token') ? <div className='mt-18'>
                <hr />
                <h4>Leave a Review</h4>
                <form onSubmit={onSubmitHandler}>
                    <textarea type="text" placeholder='Review' name='review' value={inputData.review} onChange={inputHandler} rows={4} className='border px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'></textarea>
                    <div className='mt-3'>
                        <label className='block mb-1'>Your Rating:</label><br />
                        <Rating
                            type='number'
                            name="rating"
                            value={inputData.rating}
                            precision={1}
                            onChange={handleRatingChange}
                        />
                    </div>
                    <button className='bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600 mt-3'>Submit</button>
                </form>
            </div> : ''}
        </>
    )
}

export default Review