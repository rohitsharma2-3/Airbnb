import React, { useState } from 'react';

const SignUp = () => {
  const [login, setLogin] = useState('Login')
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg  w-4/4 md:w-3/4 xl:w-2/4 ">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Account</h2>
        <form>
          {login === 'SignUp' ? <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div> : null}

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {login === "Login" ? <p>Create a new account? <span className='text-red-500 fw-bolder cursor-pointer' onClick={() => setLogin("SignUp")}> SignUp</span></p> : null}
          {login === "SignUp" ? <p>Already have an account? <span className='text-red-500 fw-bolder cursor-pointer' onClick={() => setLogin("Login")}> Login</span></p> : null}



          {/* Button */}
          <button className="group relative inline-block w-full mt-3 text-sm font-medium text-indigo-600 focus:ring-3 focus:outline-hidden">
            <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

            <span className="relative block border border-current bg-white px-8 py-3"> {login === "Login" ? 'Login' : 'SignUp'} </span>
          </button>

        </form>
      </div>
    </div>
  );
};

export default SignUp;



