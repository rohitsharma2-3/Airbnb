import React, { useEffect, useState } from 'react'
import sampleListings from './init/Data'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Listings = () => {
  const [initData, setInitData] = useState([])
  const [filter, setFilter] = useState('All');

  const location = useLocation()

  useEffect(() => {
    axios.get('http://localhost:4000/verifiedvilla')
      .then((res) => {
        setInitData(res.data)
      })
      .catch((err) => {
        console.log('err -> ', err)
      })
  }, [])

  useEffect(() => {
    if (location.state?.showToast) {
      toast.success(location.state.message || '🎉 Listing created successfully!')
      window.history.replaceState({}, document.title)
    }
  }, [location])

  return (<>
    <div className='w-10/12 mx-auto flex gap-2 mt-4 overflow-x-scroll scrollbar-hide'>
      {[
        { icon: "fa-house", label: "All" },
        { icon: "fa-fire", label: "Trending" },
        { icon: "fa-tractor", label: "Farms" },
        { icon: "fa-snowflake", label: "Arctics" },
        { icon: "fa-mountain", label: "Mountains" },
        { icon: "fa-tent", label: "Camp" },
        { icon: "fa-tree", label: "Forest" },
        { icon: "fa-city", label: "Cities" },
        { icon: "fa-person-swimming", label: "Beach" },
      ].map(({ icon, label }) => (
        <div
          key={label}
          onClick={() => setFilter(label)}
          className={`pt-3 px-3 mt-5 flex cursor-pointer items-center justify-center flex-col ${filter === label ? 'text-blue-500 font-bold' : ''
            }`}
        >
          <i className={`fa-solid ${icon} text-lg`}></i>
          <p className="text-sm">{label}</p>
        </div>
      ))}
    </div>

    <div className='flex justify-center flex-wrap gap-8 p-3'>
      {initData.filter((listing) => filter === 'All' ? true : listing.category === filter)
        .map((listings) => {
          return (
            <Link to={`/details/${listings._id}`} onClick={() => window.scroll({ top: 0 })} className='group overflow-hidden text-decoration-none w-96' key={listings._id}>
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
        })}
    </div>
  </>
  )
}

export default Listings
