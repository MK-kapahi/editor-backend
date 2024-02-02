const { mongoose } = require('mongoose')

const commentModal = new  mongoose.Schema({
    userId: { type: String},
    postId : {type : String},
    comment: { type: String },
    createdAt: { type: Date },
    parentId : {type :String}
})

module.exports = mongoose.model( "comment" , commentModal )