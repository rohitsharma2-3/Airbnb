import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

const SeeReview = () => {
    const { id } = useParams();

    const [listing, setListing] = useState(null);

    const fetchListing = () => {
        axios.get(`http://localhost:4000/verifiedvilla/${id}`)
            .then((res) => setListing(res.data))
            .catch((err) => console.log('Error -> ', err));
    };

    useEffect(() => {
        fetchListing();
    }, [id]);


    return (
        <div className='flex flex-wrap gap-4 mt-10 max-w-5xl mx-auto px-4'>
            {listing?.review?.map((review) => (
                <div key={review._id} className='rounded border border-gray-300 p-4 w-full sm:w-1/3 lg:w-[370px]'>
                    <h5 className='font-semibold text-lg mb-1'>User Review</h5>
                    <p className='text-sm mb-2 text-gray-700'>{review.review}</p>
                    <Rating value={review.rating} precision={0.5} readOnly /><br />
                    <Button className='mt-3' variant="outlined" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default SeeReview;
