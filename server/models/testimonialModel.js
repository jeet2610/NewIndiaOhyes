const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, 'Comment needed']
    },

    author: {
        type: String,
        required: [true, 'Author needed']
    }
});

module.exports = mongoose.model('Testimonial', schema);