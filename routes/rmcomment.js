var express = require('express');
var Post = require('../models/postmodel');

var router = express.Router();

router.get('/:postid/:commentid', function (req, res, next) {
    Post.findOne({ _id: req.params.postid }, function (err, post) {
        if (err) {
            console.dir(err.stack);
        }
        if (post) {
            post._doc.comments.pull({ _id: req.params.commentid });
            post.save(function (err) {
                if (err) {
                    console.dir(err.stack);
                    return;
                } else {
                    res.send("<script>alert('정상적으로 삭제 되었습니다.');location.href='/admin/comments'</script>");
                }
            });
        }
    });
});

module.exports = router;