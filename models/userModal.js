const { mongoose } = require('mongoose')

const userModal = new  mongoose.Schema({
    email: { type: String, required: true , unique : true },
    fullName: { type: String, required: true , unique : true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
})

module.exports = mongoose.model( "user" , userModal )