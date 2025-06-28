import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Listings from './Components/Listings'
import Create from './Components/Create'
import SignUp from './Components/SignUp'
import Details from './Components/Details'
import Update from './Components/Update.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <div className='text-black'>
        <Navbar />
        <div className='min-h-[100vh]'>

          <Routes>
            <Route path='/' element={<Listings />} />
            <Route path='/create' element={<Create />} />
            <Route path='/login' element={<SignUp />} />
            <Route path='/details/:id' element={<Details />} />
            <Route path='/update/:id' element={<Update />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
