import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [openHamburger, setOpenHamburger] = useState(false);
    const isLoggedIn = !!localStorage.getItem('auth-token');

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setOpenHamburger(false);
        navigate('/', {
            state: {
                showToast: true,
                message: 'Logout Successfully',
            },
        });
    };

    return (
        <header className="bg-white border-b fixed top-0 left-0 right-0 z-50">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link className="text-xl font-bold text-blue-600 text-decoration-none" to="/">
                        VerifiedVilla
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        <Link to="/" className="text-black hover:text-blue-600 text-decoration-none font-bold">Listings</Link>
                        <Link to="/create" className="text-black hover:text-blue-600 text-decoration-none font-bold">Create</Link>
                    </nav>

                    <div>
                         {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hidden md:flex text-white px-4 py-2 rounded text-decoration-none hover:bg-red-700"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-blue-600 hidden md:flex text-white px-4 py-2 rounded text-decoration-none hover:bg-blue-700"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setOpenHamburger(!openHamburger)}
                            className="p-2 text-gray-700 focus:outline-none"
                        >
                            {openHamburger ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Menu */}
            {openHamburger && (
                <div className="fixed top-0 right-0 bottom-0 w-64 min-h-screen bg-blue-50 z-40 shadow-lg flex flex-col px-6 pt-6">
                    {/* Close Button */}
                    <button
                        onClick={() => setOpenHamburger(false)}
                        className="self-end text-gray-700 hover:text-red-600"
                        aria-label="Close menu"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Menu Links */}
                    <ul className="mt-8 flex flex-col gap-4 text-sm">
                        <Link to="/" className="text-black hover:text-amber-600 text-decoration-none" onClick={() => setOpenHamburger(false)}>
                            Listings
                        </Link>
                        <Link to="/create" className="text-black hover:text-amber-600 text-decoration-none" onClick={() => setOpenHamburger(false)}>
                            Create
                        </Link>
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="text-red-600 hover:text-red-800 border border-black py-2 px-4"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setOpenHamburger(false)}
                                className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Login
                            </Link>
                        )}
                    </ul>
                </div>
            )}

        </header>
    );
};

export default Navbar;
