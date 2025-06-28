const { Schema } = require('mongoose')

const reviewSchema = new Schema({
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    
})

module.exports = { reviewSchema }