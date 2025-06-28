import React, { useEffect, useState } from 'react'
import sampleListings from './init/Data'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Listings = () => {
    const [initData, setInitData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/verifiedvilla')
            .then((res) => {
                setInitData(res.data)
            })
            .catch((err) => {
                console.log('err -> ', err)
            })
    }, [])

    return (
        <div className='flex justify-center flex-wrap gap-8 p-3 mt-20'>{initData.map((listings) => {
            return (
                <Link to={`/details/${listings._id}`} onClick={() => window.scroll({ top: 0 })} className='group overflow-hidden text-decoration-none w-96' key={listings._id} >
                    <img
                        src={listings.image.url}
                        alt={listings.title}
                        className="h-64 w-full rounded-top object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                    />
                    <div className="relative bg-white">
                        <p className="text-gray-700 flex gap-2">
                            ₹ {listings.price} / night
                        </p>

                        <h3 className="mt-1.5 text-lg font-medium text-gray-900">{listings.title}</h3>

                        <p className="mt-1.5 line-clamp-3 text-gray-700">
                            {listings.description}
                        </p>
                    </div>
                </Link>
            )
        })}</div>
    )
}

export default Listings