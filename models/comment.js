const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        required: true
    }
})

const imageCommentSchema = new mongoose.Schema({
    imageName: {
        type: String,
        require: true
    },
    comments: [commentSchema],

})

module.exports = mongoose.model('Comment', imageCommentSchema)