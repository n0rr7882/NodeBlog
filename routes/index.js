var express = require('express');
var md = require('markdown-it')();
var PController = require('../controllers/postcontroller');
var CController = require('../controllers/categorycontroller');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    PController.findPostsAll(0, (err, posts) => {
        if (!err) {
            CController.findCategorys((err, categories) => {
                if (!err) {
                    PController.getNumberOfAllPosts((err, c) => {
                        if (!err) {
                            res.render('index', {
                                posts: posts,
                                categories: categories,
                                md: md,
                                pageStatus: 0,
                                categoryStatus: undefined,
                                numberOfPosts: c
                            });
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
        } else {
            console.error(err.stack);
            res.render('error');
        }
    });
});

router.get('/pages/:pNumber', (req, res, next) => {
    PController.findPostsAll(parseInt(req.params.pNumber), (err, posts) => {
        if (!err) {
            CController.findCategorys((err, categories) => {
                if (!err) {
                    PController.getNumberOfAllPosts((err, c) => {
                        if (!err) {
                            res.render('index', {
                                posts: posts,
                                categories: categories,
                                md: md,
                                pageStatus: parseInt(req.params.pNumber),
                                categoryStatus: undefined,
                                numberOfPosts: c
                            });
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
        } else {
            console.error(err.stack);
            res.render('error');
        }
    });
});

router.get('/category/:category', (req, res, next) => {
    PController.findPostsByCategory(0, req.params.category, (err, posts) => {
        if (!err) {
            CController.findCategorys((err, categories) => {
                if (!err) {
                    PController.getNumberOfPostsByCategory(req.params.category, (err, c) => {
                        if (!err) {
                            res.render('index', {
                                posts: posts,
                                categories: categories,
                                md: md,
                                pageStatus: 0,
                                categoryStatus: req.params.category,
                                numberOfPosts: c
                            });
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
        } else {
            console.error(err.stack);
            res.render('error');
        }
    });
});

router.get('/category/:category/:pNumber', (req, res, next) => {
    PController.findPostsByCategory(parseInt(req.params.pNumber), req.params.category, (err, posts) => {
        if (!err) {
            CController.findCategorys((err, categories) => {
                if (!err) {
                    PController.getNumberOfPostsByCategory(req.params.category, (err, c) => {
                        if (!err) {
                            res.render('index', {
                                posts: posts,
                                categories: categories,
                                md: md,
                                pageStatus: parseInt(req.params.pNumber),
                                categoryStatus: req.params.category,
                                numberOfPosts: c
                            });
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
        } else {
            console.error(err.stack);
            res.render('error');
        }
    });
});

module.exports = router;