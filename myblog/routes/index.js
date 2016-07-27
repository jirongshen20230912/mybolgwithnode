var express = require('express');
var crypto = require('crypto');
var User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'JohnSen的博客', layout: 'template'});

});
/* POST home page. */
router.post('/post', function (req, res) {

});
/* REG get. */
router.get('/reg',checkNotLogin);
router.get('/reg', function (req, res) {
    res.render('reg', {title: '注册', layout: 'template'});
});
/* REG post. */
router.post('/reg',checkNotLogin);
router.post('/reg', function (req, res) {
    //检验用户两次输入的密码是否一致
    if (req.body['password-repeat'] != req.body['password']) {
        req.flash('error', '两次输入的密码不一致');
        return res.redirect('/reg');
    }
    //生成密码的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        name: req.body.username,
        password: password,
    });

    //检查用户名是否已经存在
    User.get(newUser.name, function (err, user) {
        if (user) {
            err = '用户名已经存在';
        }
        if (err) {
            req.flash('error', err);
            return res.redirect('/reg');
        }
        //如果不存在则新增用户
        newUser.save(function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');
            }
            req.session.user = newUser;
            req.flash('success', '注册成功');
            res.redirect('/');
        })
    });
});
/* login get. */
router.get('/login', checkNotLogin);
router.get('/login', function (req, res) {
    res.render('login', {title: '用户登录', layout: 'template'});
});
/* login post. */
router.post('/login', checkNotLogin);
router.post('/login', function (req, res) {
    //生成密码的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.get(req.body.username, function (err, user) {
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/login');
        }
        if (user.password != password) {
            req.flash('error', '用户密码错误');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success', '成功登录');
        res.redirect('/');
    });
});
/* logout get. */
router.get('/logout',checkLogin);
router.get('/logout', function (req, res) {
    req.session.user = null;
    req.flash('success', '登出成功');
    res.redirect('/');
});

function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录');
        return res.redirect('/login');
    }
    next();
}
function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登入');
        return res.redirect('/');
    }
    next();
}

module.exports = router;
