const { model } = require('mongoose')
const { listingSchemas } = require('../Schema/Listings')

const Listing = new model('Listing', listingSchemas)

module.exports = Listing