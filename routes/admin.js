var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.is_login === true) {
        res.send("<script>location.href='/admin/main'</script>");
    } else {
        res.render('admin');
    }
});

router.post('/', function (req, res, next) {
    if (req.body.id === 'admin' && req.body.pw === '****') {
        req.session.is_login = true;
    } else {
        req.session.is_login = false;
    }
    res.send("<script>location.href='/admin/main'</script>");
});

module.exports = router;
