const mongoose = require('mongoose')

const Listing = require('../Models/ListingModel')
const initData = require('./Data')

const mongoDB = 'mongodb+srv://rohitsharma:UD5IBqEGU6TmwKrx@cluster0.7zpmy8w.mongodb.net/AirBnb?retryWrites=true&w=majority&appName=Cluster0'

main()
    .then(() => {
        console.log('Connected')
    })
    .catch((err) => {
        console.log(err)
    })

async function main() {
    mongoose.connect(mongoDB)
}

const init = async () => {
    await Listing.deleteMany({})
    initData.data = initData.data.map((item, i) => ({
        ...item, owner: '6860fbbf0b5ab87da361fcb4'
    }))
    await Listing.insertMany(initData.data)
}

init()