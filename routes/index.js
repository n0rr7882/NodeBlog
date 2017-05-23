var express = require('express');
var md = require('markdown-it')();
var Post = require('../models/postmodel');
var router = express.Router();
// Post.findAll(function(err, results) {
//     console.dir(results);
// });
/* GET home page. */
router.get('/', function (req, res, next) {
    Post.find({ is_secret: false }, (err, posts) => {
        if (err) {
            console.dir(err.stack);
            return false;
        }
        res.render('index', { posts: posts, md: md });
    }).sort({ date: -1 });
});

module.exports = router;