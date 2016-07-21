var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '' ,layout:'template'});
});
/* POST home page. */
router.post('/post', function(req, res) {

});
/* REG get. */
router.get('/reg', function(req, res) {

});
/* REG post. */
router.post('/reg', function(req, res) {

});
/* login get. */
router.get('/login', function(req, res) {

});
/* login post. */
router.post('/login', function(req, res) {

});
/* logout get. */
router.get('/logout', function(req, res) {

});
module.exports = router;
