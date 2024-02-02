const { mongoose } = require('mongoose')

const postModal = new  mongoose.Schema({
    userId: { type: String},
    content: { type: String },
    createdAt: { type: Date },
    updatedAt : {type : Date },
})

module.exports = mongoose.model( "post" , postModal )