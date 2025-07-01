import React from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Review from './Review'
import SeeReview from './SeeReview'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
const token = localStorage.getItem("auth-token");

const Details = () => {
    let navigate = useNavigate()
    let location = useLocation()
    let { id } = useParams();
    const [Listing, setListings] = useState(null);
    const [userId, setUser] = useState();

    const fetchListing = () => {
        axios.get(`https://airbnb-8dy1.onrender.com/verifiedvilla/${id}`)
            .then((res) => {
                setListings(res.data);
            })
            .catch((err) => {
                console.log('Error:', err);
            });
    };

    useEffect(() => {
        fetchListing();
    }, [id]);

    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded.user.id); 
            } catch (err) {
                console.error("Invalid token");
            }
        }
    }, []);

    useEffect(() => {
        if (location.state?.showToast) {
            toast.success(location.state.message || '🎉 Listing created successfully!')
            window.history.replaceState({}, document.title)
        }
    }, [location])

    const deleteHandler = () => {
        axios.delete(`https://airbnb-8dy1.onrender.com/verifiedvilla/delete/${id}`)
            .then((res) => {
                setListings(res.data)
                navigate('/', {
                    state: {
                        showToast: true,
                        message: '🗑️ Listing deleted successfully!',
                    },
                });
            })
    }

    if (!Listing) {
        return <div>Loadings...</div>
    }

    return (
        <>
            <div className="max-w-4xl mx-auto p-4 mt-12">
                <h1 className="text-3xl font-bold">{Listing.title}</h1>
                <img src={Listing.image.url} alt={Listing.title} className="rounded-lg mb-6 h-96 w-full object-cover" />
                <h1>{Listing.owner?.name || "Unknown Owner"}</h1>
                <p className="text-gray-600 mt-2">{Listing.description}</p>
                <p className="mt-4 text-xl text-indigo-600 font-semibold">₹ {Listing.price} / night</p>
                <p className="text-gray-500 mt-2">{Listing.location}, {Listing.country}</p>
                <div className='flex gap-10'>
                    {Listing.owner?._id === userId ?
                        <>
                            <Link to={`/update/${id}`}>
                                <button className="group relative inline-block">
                                    <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-blue-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                                    <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold tracking-widest text-black uppercase">Update</span>
                                </button>
                            </Link>
                            <button className="group relative inline-block " onClick={deleteHandler}>
                                <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-red-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                                <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold tracking-widest text-black uppercase">Delete</span>
                            </button>
                        </> : null}
                </div>
                {Listing && (
                    <>
                        <Review />
                        <SeeReview />
                    </>
                )}
            </div>
        </>
    )
}

export default Details
