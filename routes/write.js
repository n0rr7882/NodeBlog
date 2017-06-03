var express = require('express');
var multer = require('multer');
var PController = require('../controllers/postcontroller');
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
router.post('/', preview.single('preview'), (req, res, next) => {
    if (req.body.title != '' && req.body.category != '' && req.body.content != '') {
        var preview = req.file ? (req.file.destination + req.file.filename) : undefined;
        var secret = (req.body.is_secret == 'true') ? true : false;
        PController.insertPost((req.body.title + ' '), req.body.category, preview, req.body.content, secret, (err) => {
            if (!err) {
                res.send('<script>alert("포스트 업로드 성공");location.href="/"</script>');
            } else {
                console.error(err.stack);
                res.send('<script>alert("포스트 업로드 실패");history.back()</script>');
            }
        });
    } else {
        res.send('<script>alert("폼을 모두 채워주세요.");history.back()</script>');
    }
});

router.post('/uploads', upload.single('upload'), function (req, res, next) {
    res.send('<script>alert("파일 업로드 성공");history.back()</script>');
});

module.exports = router;
