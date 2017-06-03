var express = require('express');
var fs = require('fs');
var PController = require('../controllers/postcontroller');
var md = require('markdown-it')();

var router = express.Router();

router.post('/', (req, res, next) => {
    if (req.body.title === '') req.body.title = ' ';
    PController.findPostsByTitle(req.body.title, (err, posts) => {
        if (!err) {
            if (posts.length != 0) {
                res.render('selectpost', { posts: posts, md: md });
            } else {
                res.send("<script>alert('일치하는 포스트가 존재하지 않습니다.');location.href='/admin/delete'</script>");
            }
        } else {
            console.error(err.stack);
            res.render('error');
        }
    });
});

router.get('/:postId', (req, res, next) => {
    PController.findPostByObjectId(req.params.postId, (err, post) => {
        if (!err) {
            if (post._doc.preview !== 'images/colors.png') {
                fs.unlink(post._doc.preview, (err) => {
                    if (!err) {
                        console.log(post._doc.preview + ' successfully deleted!');
                    } else {
                        console.error(err.stack);
                    }
                });
            }
            PController.deletePostByObjectId(req.params.postId, (err) => {
                if (!err) {
                    res.send("<script>alert('정상적으로 삭제 되었습니다.');history.back()</script>");
                } else {
                    console.error(err.stack);
                    res.send("<script>alert('삭제 중 에러 발생.');history.back()</script>");
                }
            });
        } else {
            console.error(err.stack);
            res.render('error');
        }
    });
});

module.exports = router;
