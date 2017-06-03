var express = require('express');
var fs = require('fs');
var PController = require('../controllers/postcontroller');
var CController = require('../controllers/categorycontroller');

var router = express.Router();

/* GET home page. */
router.get('/main', (req, res, next) => {
    if (req.session.is_login === true) {
        res.render('adminpage');
    } else {
        res.send("<script>alert('접근 권한이 없습니다.');location.href='/admin'</script>");
    }
});

router.get('/write', (req, res, next) => {
    if (req.session.is_login === true) {
        CController.findCategorys((err, categories) => {
            if (!err) {
                res.render('postform', { categories: categories });
            } else {
                console.error(err.stack);
                res.render('error');
            }
        });
    } else {
        res.send("<script>alert('접근 권한이 없습니다.');location.href='/admin'</script>");
    }
});

router.get('/delete', (req, res, next) => {
    if (req.session.is_login === true) {
        res.render('searchpost');
    } else {
        res.send("<script>alert('접근 권한이 없습니다.');location.href='/admin'</script>");
    }
});

router.get('/category', (req, res, next) => {
    if (req.session.is_login === true) {
        CController.findCategorys((err, categories) => {
            if (!err) {
                res.render('category', { categories: categories });
            } else {
                console.error(err.stack);
                res.render('error');
            }
        });
    } else {
        res.send("<script>alert('접근 권한이 없습니다.');location.href='/admin'</script>");
    }
});

router.get('/category/:name', (req, res, next) => {
    if (req.session.is_login === true) {
        CController.deleteCategory(req.params.name, (err) => {
            if (!err) {
                PController.deletePostsByCategory(req.params.name, (err) => {
                    if (!err) {
                        res.send("<script>alert('정상적으로 삭제되었습니다.');location.href='/admin/category'</script>");
                    } else {
                        console.error(err.stack);
                        res.send("<script>alert('포스트 삭제 중 오류 발생.');history.back()</script>");
                    }
                });
            } else {
                res.send("<script>alert('카테고리 삭제 중 오류 발생.');history.back()</script>");
            }
        });
    } else {
        res.send("<script>alert('접근 권한이 없습니다.');location.href='/admin'</script>");
    }
});

router.post('/category', (req, res, next) => {
    if (req.session.is_login === true) {
        if (req.body.name !== '') {
            CController.insertCategory(req.body.name, (err) => {
                if (!err) {
                    res.send("<script>alert('정상적으로 생성되었습니다.');location.href='/admin/category'</script>");
                } else {
                    console.error(err.stack);
                    res.send("<script>alert('카테고리 생성 중 에러 발생.');location.href='/admin/category'</script>");
                }
            });
        } else {
            res.send("<script>alert('카테고리 이름이 잘못되었습니다.');history.back()</script>");
        }
    } else {
        res.send("<script>alert('접근 권한이 없습니다.');location.href='/admin'</script>");
    }
});

router.get('/uploaded', (req, res, next) => {
    if (req.session.is_login === true) {
        fs.readdir(__dirname + '/../uploads/', (err, files) => {
            if (!err) {
                res.render('uploaded', { files: files });
            } else {
                console.error(err.stack);
                res.send("<script>alert('업로드 중 에러 발생.');history.back()</script>");
            }
        });
    } else {
        res.send("<script>alert('접근 권한이 없습니다.');location.href='/admin'</script>");
    }
});

router.get('/logout', (req, res, next) => {
    if (req.session.is_login === true) {
        req.session.destroy((err) => {
            if (!err) {
                res.send("<script>alert('정상적으로 로그아웃 되었습니다.');location.href='/'</script>");
            } else {
                console.error(err.stack);
                res.send("<script>alert('로그아웃 중 에러 발생.');history.back()</script>");
            }
        });
    } else {
        res.send("<script>alert('접근 권한이 없습니다.');location.href='/admin'</script>");
    }
});

module.exports = router;
