import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Create = () => {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        title: '',
        description: '',
        image: {
            url: '',
            filename: 'listingimage'
        },
        location: '',
        country: '',
        price: ''
    });

    const inputHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'image') {
            setInputData({ ...inputData, image: { url: value, filename: 'listingimage' } });
        } else {
            setInputData({ ...inputData, [name]: value });
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        console.log(inputData)

        axios.post(`http://localhost:4000/verifiedvilla/create`, inputData)
            .then((res) => {
                console.log(res.data);
                navigate('/', {
                    state: {
                        showToast: true,
                        message: '🎉 Listing created successfully!',
                    },
                });
            })
            .catch((err) => {
                console.log('err ->', err);
                toast.error('🚨 Failed to create listing: ' + err.message);
            });

        setInputData({
            title: '',
            description: '',
            image: {
                url: '',
                filename: ''
            },
            location: '',
            country: '',
            price: ''
        })
    }
    return (
        <div className="mt-18 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 ">Create Listings</h2>
            <form onSubmit={onSubmitHandler}>
                <div className='mt-4'>
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder='Enter title' name='title' value={inputData.title} onChange={inputHandler} className='border px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-2' />
                </div>
                <div className='mt-4'>
                    <label htmlFor="description">Description</label>
                    <input type="text" placeholder='Enter description' name='description' value={inputData.description} onChange={inputHandler} className='border px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-2' />
                </div>
                <div className='mt-4'>
                    <label htmlFor="image">Image</label>
                    <input type="text" placeholder='Enter image' name='image' value={inputData.image.url || ''} onChange={inputHandler} className='border px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-2' />
                </div>
                <div className='flex gap-3'>
                    <div className='mt-4 w-1/2'>
                        <label htmlFor="location">Location</label>
                        <input type="text" placeholder='Enter location' name='location' value={inputData.location} onChange={inputHandler} className='border px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-2' />
                    </div>
                    <div className='mt-4 w-1/2'>
                        <label htmlFor="country">Country</label>
                        <input type="text" placeholder='Enter country' name='country' value={inputData.country} onChange={inputHandler} className='border px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-2' />
                    </div>
                </div>
                <div className='mt-4'>
                    <label htmlFor="price">Price</label>
                    <input type="number" placeholder='Enter price' name='price' value={inputData.price} onChange={inputHandler} className='border px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-2' />
                </div>
                <button className="group relative inline-block mt-4">
                    <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-blue-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                    <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold tracking-widest text-black uppercase">Update</span>
                </button>
            </form>
        </div>
    );
};

export default Create;
