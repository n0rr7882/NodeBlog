const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    preview: { type: String, default: 'images/colors.png' },
    content: String,
    date: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    is_secret: { type: Boolean, required: true },
    comments: [{
        author: { type: String, required: true },
        date: { type: Date, default: Date.now },
        comment: { type: String, required: true }
    }]
});

module.exports = mongoose.model('post', postSchema);
