const Post = require('../models/postmodel');

var controller = {
    findPostsAll: (pageNumber, callback) => {
        Post.find({}, (err, posts) => {
            callback(err, posts);
        }).sort({ date: -1 }).skip(pageNumber * 5).limit(5);
    },
    findPostByObjectId: (objectId, callback) => {
        Post.findById(objectId, (err, post) => {
            callback(err, post);
        });
    },
    findPostsByTitle: (title, callback) => {
        Post.find({ title: { $regex: title } }, (err, posts) => {
            callback(err, posts);
        }).sort({ date: -1 });
    },
    findPostsByCategory: (pageNumber, category, callback) => {
        Post.find({ category: category }, (err, posts) => {
            callback(err, posts);
        }).sort({ date: -1 }).skip(pageNumber * 5).limit(5);
    },
    insertPost: (title, category, preview, content, is_secret, callback) => {
        var post = new Post({
            title: title,
            category: category,
            preview: preview,
            content: content,
            views: 0,
            is_secret: is_secret,
            comments: []
        });
        post.save((err) => {
            callback(err);
        });
    },
    deletePostByObjectId: (objectId, callback) => {
        Post.remove({ _id: objectId }, (err) => {
            callback(err);
        });
    },
    deletePostsByCategory: (category, callback) => {
        Post.remove({ category: category }, (err) => {
            callback(err);
        });
    }
};

module.exports = controller;