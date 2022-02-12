const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'BookStore' });
});
router.get('/about', function (req, res, next) {
  res.render('about', { title: 'about' });
});
router.get('/vpn', function (req, res, next) {
  res.render('Vpn', { title: 'VPN' });
});
router.get('/Proxy', function (req, res, next) {
  res.render('Proxy', { title: 'Proxy' });
});

module.exports = router;
