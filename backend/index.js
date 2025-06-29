require('dotenv').config();

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const port = process.env.PORT || 4000
const mongoDB = process.env.MONGODB_URL

// -----------------------------

const Listing = require('./Models/ListingModel')
const Review = require('./Models/ReviewModel')
const User = require('./Models/UserModel')

// -----------------------------

const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.json());
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
app.put('/verifiedvilla/update/:id', async (req, res) => {
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

app.post('/verifiedvilla/signup', async (req, res) => {
    const { name, email, password } = req.body;

    let check = await User.findOne({
        email: req.body.email,
    })

    if (check) {
        return res.json({
            success: false,
            errors: 'exiting user found with same email!'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword,
    })

    await user.save()

    const data = {
        user: {
            id: user._id
        }
    }

    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ success: true, token });
})

app.post('/verifiedvilla/login', async (req, res) => {
    let user = await User.findOne({
        email: req.body.email
    })

    if (user) {
        const passCompare = await bcrypt.compare(req.body.password, user.password);
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }

            const token = jwt.sign(data, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {

            res.json({
                success: false,
                errors: "Wrong password"
            })
        }
    } else {
        res.json({
            success: false,
            errors: 'Wrong email id'
        })
    }
})

app.listen(port, () => {
    console.log(`PORT is connected : http://localhost:${port}/VerifiedVilla`)
    mongoose.connect(mongoDB)
    console.log('DB Connected')
})