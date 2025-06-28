import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Update = () => {
    let { id } = useParams()

    const [inputData, setInputData] = useState({
        title: '',
        description: '',
        image: '',
        location: '',
        country: '',
        price: '',
    })

    const inputHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'image') {
            setInputData({ ...inputData, image: { ...inputData.image, url: value, filename: "listingimage" } });
        } else {
            setInputData({ ...inputData, [name]: value });
        }
    };


    const onSubmitHandler = (e) => {
        e.preventDefault()
        console.log(inputData)

        axios.put(`http://localhost:4000/update/${id}`, inputData)
            .then((res) => {
                console.log(res.data)
                setInputData({
                    title: '',
                    description: '',
                    image: '',
                    location: '',
                    country: '',
                    price: '',
                })
                window.location.href= `/details/${id}`
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/verifiedvilla/${id}`)
            .then((res) => {
                setInputData(res.data)
            })
    }, [])
    return (
        <div className='mt-24 max-w-3xl mx-auto p-3'>
            <h3>Update Listings</h3>
            <form className='w-4/4' onSubmit={onSubmitHandler}>
                <div className='mt-4'>
                    <label htmlFor="title" className='' >Title:</label>
                    <input type="text" placeholder='Enter title' name='title' value={inputData.title} onChange={inputHandler} id='title' className='border px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-1' />
                </div>
                <div className='mt-4'>
                    <label htmlFor="description" className='' >Description:</label>
                    <textarea type="text" placeholder='Enter description' name='description' value={inputData.description} onChange={inputHandler} id='description' className='border px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-1' rows={3}></textarea>
                </div>
                <div className='mt-4'>
                    <label htmlFor="image" className='' >Image:</label>
                    <input type="text" placeholder='Enter image' name='image' value={inputData.image.url || ''} onChange={inputHandler} id='image' className='border px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-1' />
                </div>
                <div className='flex gap-3 mt-4'>
                    <div className='w-1/2'>
                        <label htmlFor="location" className='' >Location:</label>
                        <input type="text" placeholder='Enter location' name='location' value={inputData.location} onChange={inputHandler} id='location' className='border px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-1' />
                    </div>
                    <div className='w-1/2'>
                        <label htmlFor="country" className='' >Country:</label>
                        <input type="text" placeholder='Enter country' name='country' value={inputData.country} onChange={inputHandler} id='country' className='border px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-1' />
                    </div>
                </div>
                <div className='mt-4'>
                    <label htmlFor="price" className='' >Price:</label>
                    <input type="number" placeholder='Enter price' name='price' value={inputData.price} onChange={inputHandler} id='price' className='border px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-1' />
                </div>
                <button className="group relative inline-block mt-4">
                    <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-blue-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                    <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold tracking-widest text-black uppercase">Update</span>
                </button>
            </form>
        </div>
    )
}

export default Update