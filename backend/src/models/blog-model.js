const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    content: {
        type: Object,
        required: true
    },
    image: String,
    category: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        min: 1, 
        max: 5,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const BlogModel = mongoose.model("Blog", BlogSchema)

module.exports = BlogModel