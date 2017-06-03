var Category = require('../models/categorymodel');
var Post = require('../models/postmodel');

var controller = {
    findCategorys: (callback) => {
        Category.find({}, (err, categories) => {
            callback(err, categories);
        }).sort({ name: 1 });
    },
    insertCategory: (name, callback) => {
        var category = new Category({
            name: name
        });
        category.save((err) => {
            callback(err);
        });
    },
    deleteCategory: (name, callback) => {
        Category.remove({ name: name }, (err) => {
            callback(err);
        });
    }
};

module.exports = controller;