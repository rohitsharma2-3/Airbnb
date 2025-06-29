const { model } = require('mongoose')
const { userSchema } = require('../Schema/UserSchema')

const User = new model('User', userSchema)

module.exports = User