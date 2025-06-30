const { Schema } = require('mongoose')

const listingSchemas = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        url: String,
        filename: String
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        required: true
    }
})

module.exports = { listingSchemas }