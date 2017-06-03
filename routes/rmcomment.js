var express = require('express');
var Post = require('../models/postmodel');
var PController = require('../controllers/postcontroller');


var router = express.Router();

router.get('/:postId/:commentId', (req, res, next) => {
    PController.findPostByObjectId(req.params.postId, (err, post) => {
        if (!err) {
            post._doc.comments.pull({ _id: req.params.commentId });
            post.save((err) => {
                if (!err) {
                    res.send("<script>alert('정상적으로 삭제 되었습니다.');history.back()</script>");
                } else {
                    console.error(err.stack);
                    res.send("<script>alert('알 수 없는 오류.');history.back()</script>");
                }
            });
        } else {
            console.error(err.stack);
            res.send("<script>alert('알 수 없는 오류.');history.back()</script>");
        }
    });
});

module.exports = router;
