var express = require('express');
var fs = require('fs');
var Post = require('../models/postmodel');
var Category = require('../models/categorymodel');

var router = express.Router();

/* GET home page. */
router.get('/main', function (req, res, next) {
    if (req.session.is_login === true) {
        res.render('adminpage');
    } else {
        res.send("<script>alert('접근 권한이 없습니다.');location.href='/admin'</script>");
    }
});

router.get('/write', function (req, res, next) {
    if (req.session.is_login === true) {
        Category.find({}, function (err, categories) {
            if (err) {
                console.dir(err);
                return;
            }
            res.render('postform', { categories: categories });
        });
    } else {
        res.send("<script>alert('접근 권한이 없습니다.');location.href='/admin'</script>");
    }
});

router.get('/delete', function (req, res, next) {
    if (req.session.is_login === true) {
        res.render('searchpost');
    } else {
        res.send("<script>alert('접근 권한이 없습니다.');location.href='/admin'</script>");
    }
});

router.get('/comments', function (req, res, next) {
    if (req.session.is_login === true) {
        Post.find({}, function (err, posts) {
            if (err) {
                console.dir(err.stack);
                return;
            }
            if (posts) {
                res.render('selectcomment', { posts: posts });
            } else {
                res.send("<script>alert('포스트가 존재하지 않습니다.');history.back()</script>");
            }
        });
    } else {
        res.send("<script>alert('접근 권한이 없습니다.');location.href='/admin'</script>");
    }
});

router.get('/category', function (req, res, next) {
    if (req.session.is_login === true) {
        Category.find({}, function (err, categories) {
            if (err) {
                console.dir(err);
                return;
            }
            res.render('category', { categories: categories });
        });
    } else {
        res.send("<script>alert('접근 권한이 없습니다.');location.href='/admin'</script>");
    }
});

router.get('/category/:name', function (req, res, next) {
    if (req.session.is_login === true) {
        Category.remove({ name: req.params.name }, function (err, results) {
            if (err) {
                console.dir(err);
                return;
            }
            Post.remove({ category: req.params.name }, function (err, results) {
                if (err) {
                    console.dir(err.stack);
                    return;
                }
                res.send("<script>alert('정상적으로 삭제되었습니다.');location.href='/admin/category'</script>");
            });
        });
    } else {
        res.send("<script>alert('접근 권한이 없습니다.');location.href='/admin'</script>");
    }
});

router.post('/category', function (req, res, next) {
    if (req.session.is_login === true) {
        if (req.body.name != '') {
            var category = new Category({ name: req.body.name });
            category.save(function (err) {
                if (err) {
                    console.dir(err.stack);
                    return;
                }
            });
            res.send("<script>alert('정상적으로 생성되었습니다.');location.href='/admin/category'</script>");
        } else {
            res.send("<script>alert('카테고리 이름이 잘못되었습니다.');history.back()</script>");
        }
    }
});

router.get('/uploaded', function (req, res, next) {
    if (req.session.is_login === true) {
        fs.readdir(__dirname + '/../uploads/', function (err, files) {
            if (err) {
                console.dir(err.stack);
                res.render('error');
                return;
            }
            res.render('uploaded', { files: files });
        });
    } else {
        res.send("<script>alert('접근 권한이 없습니다.');location.href='/admin'</script>");
    }
});

router.get('/logout', function (req, res, next) {
    if (req.session.is_login === true) {
        req.session.destroy(function (err) {
            if (err) {
                console.dir(err.stack);
                return;
            }
            res.send("<script>alert('정상적으로 로그아웃 되었습니다.');location.href='/'</script>");
        });
    } else {
        res.send("<script>alert('접근 권한이 없습니다.');location.href='/admin'</script>");
    }
});

module.exports = router;
