var express = require('express');
var Post = require('../models/postmodel');
var hljs = require('highlight.js');
var md = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';
            } catch (__) {}
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});

var router = express.Router();

/* GET users listing. */
router.get('/:postId', function(req, res, next) {
    Post.findOne({ _id: req.params.postId }, function (err, post) {
        if(err) {
            console.dir(err.stack);
        }
        if(post) {
            post.views += 1;
            post.save(function (err) {
                if(err) {
                    console.dir(err.stack);
                    return;
                }
            });
            post._doc.content = md.render(post._doc.content);
            res.render('post', { post: post });
            return;
        }
        res.render('error');
    });
});

router.post('/:postId', function(req, res, next) {
    Post.findOne({ _id: req.params.postId }, function (err, post) {
        if(err) {
            console.dir(err.stack);
        }
        if(post) {
            post._doc.comments.push({
                author: req.body.author,
                comment: req.body.content
            });
            post.save(function(err) {
                if(err) {
                    console.dir(err.stack);
                    return;
                }
            });
            post._doc.content = md.render(post._doc.content);
            res.render('post', { post: post });
            return;
        }
        res.render('error');
    });
});

module.exports = router;
