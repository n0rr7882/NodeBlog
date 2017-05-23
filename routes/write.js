var express = require('express');
var multer = require('multer');
var Post = require('../models/postmodel');

var router = express.Router();

var uploadStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var previewStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'previews/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});
var upload = multer({ storage: uploadStorage });
var preview = multer({ storage: previewStorage });

/* GET home page. */
router.post('/', preview.single('preview'), function (req, res, next) {

    if (req.body.title != '' && req.body.category != '' && req.body.content != '') {
        var post = new Post({
            title: req.body.title + ' ',
            category: req.body.category,
            preview: req.file ? (req.file.destination + req.file.filename) : undefined,
            content: req.body.content,
            views: 0,
            is_secret: (req.body.is_secret == 'true') ? true : false,
            comments: []
        });
        console.dir(post);
        post.save(function (err, results) {
            if (err) {
                console.dir(err.stack);
                res.send('<script>alert("포스트 업로드 실패");history.back()</script>');
            }
        });
        res.send('<script>alert("포스트 업로드 성공");location.href="/"</script>');
    } else {
        res.send('<script>alert("폼을 모두 채워주세요.");history.back()</script>');
    }
});

router.post('/uploads', upload.single('upload'), function (req, res, next) {
    res.send('<script>alert("파일 업로드 성공");history.back()</script>');
});

module.exports = router;
