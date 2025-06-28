require('dotenv').config();

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const port = process.env.PORT || 4000
const mongoDB = process.env.MONGODB_URL

// -----------------------------

const Listing = require('./Models/ListingModel')
const Review = require('./Models/ReviewModel')

// -----------------------------

const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())


// All Listings
app.get('/verifiedvilla', async (req, res) => {
    const Listings = await Listing.find({})
    res.json(Listings)
})

// Create Listings
app.post('/verifiedvilla/create', async (req, res) => {
    const { title, description, price, image, location, country } = req.body
    const newListing = new Listing({
        title,
        description,
        price,
        image,
        location,
        country
    })
    await newListing.save()
    res.json(newListing)
})

// Update Listings
app.put('/update/:id', async (req, res) => {
    let { id } = req.params
    const { title, description, price, image, location, country } = req.body
    const UpdListinng = await Listing.findByIdAndUpdate(id, {
        title,
        description,
        price,
        image,
        location,
        country
    },
        { new: true }
    )
    res.json(UpdListinng)
})

// Delete Listings
app.delete('/verifiedvilla/delete/:id', async (req, res) => {
    let { id } = req.params
    let delListings = await Listing.findByIdAndDelete(id)
    res.json(delListings)
})

// Review For Listings
app.post('/verifiedvilla/review/:id', async (req, res) => {
    const { id } = req.params;
    const { review, rating } = req.body;

    const reviewListing = new Review({
        review,
        rating
    });

    await reviewListing.save();
    const listing = await Listing.findById(id);

    listing.review.push(reviewListing._id);
    await listing.save();
    const updatedListing = await Listing.findById(id).populate('review');

    res.json(updatedListing);
});

// Details Listings
app.get('/verifiedvilla/:id', async (req, res) => {
    const Listings = await Listing.findById(req.params.id).populate('review')
    res.json(Listings)
})

app.listen(port, () => {
    console.log(`PORT is connected : http://localhost:${port}/VerifiedVilla`)
    mongoose.connect(mongoDB)
    console.log('DB Connected')
})