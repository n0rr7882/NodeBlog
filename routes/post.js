var express = require('express');
var PController = require('../controllers/postcontroller');
var hljs = require('highlight.js');
var md = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';
            } catch (__) { }
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});

var router = express.Router();

/* GET users listing. */

router.get('/:postId', (req, res, next) => {
    PController.findPostByObjectId(req.params.postId, (err, post) => {
        if (!err) {
            post.views += 1;
            post.save((err) => {
                if (!err) {
                    post._doc.content = md.render(post._doc.content);
                    res.render('post', { post: post });
                } else {
                    console.error(err.stack);
                    res.render('error');
                }
            });
        } else {
            console.error(err.stack);
            res.render('error');
        }
    });
});

router.post('/:postId', (req, res, next) => {
    PController.findPostByObjectId(req.params.postId, (err, post) => {
        if (!err) {
            var comment = {
                author: req.body.author,
                comment: req.body.content
            };
            post._doc.comments.push(comment);
            post.save((err) => {
                if (!err) {
                    post._doc.content = md.render(post._doc.content);
                    res.render('post', { post: post })
                } else {
                    console.error(err.stack);
                    res.render('error');
                }
            })
        } else {
            console.error(err.stack);
            res.render('error');
        }
    });
});

module.exports = router;
