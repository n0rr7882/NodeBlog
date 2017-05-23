var express = require('express');
var fs = require('fs');
var Post = require('../models/postmodel');
var md = require('markdown-it')();

var router = express.Router();

router.post('/', function (req, res, next) {
    if (req.body.title === '') req.body.title = ' ';
    Post.find({ title: { $regex: req.body.title } }, function (err, posts) {
        if (err) {
            console.dir(err.stack);
            return;
        }
        if (posts.length != 0) {
            res.render('selectpost', { posts: posts, md: md });
        } else {
            res.send("<script>alert('일치하는 포스트가 존재하지 않습니다.');location.href='/admin/delete'</script>");
        }
    }).sort({ date: -1 });
});

router.get('/:postid', function (req, res, next) {
    Post.findOne({ _id: req.params.postid }, (err, post) => {
        if (err) {
            console.dir(err.stack);
            return;
        }
        if (post) {
            if (post._doc.preview !== "images/colors.png") {

                fs.unlink(post._doc.preview, function (err) {
                    if (err) {
                        console.dir(err.stack);
                        return;
                    } else {
                        console.log(post._doc.preview + ' successfully deleted!');
                    }
                });
            }
            Post.remove({ _id: req.params.postid }, function (err, results) {
                if (err) {
                    console.dir(err.stack);
                    return;
                }
                if (results) {
                    res.send("<script>alert('정상적으로 삭제 되었습니다.');location.href='/admin'</script>");
                }
            });
        }
    });
});

module.exports = router;
