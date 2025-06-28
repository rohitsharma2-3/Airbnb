const { model } = require('mongoose')
const { reviewSchema } = require('../Schema/ReviewSchema')

const Review =  model('Review', reviewSchema)

module.exports = Review