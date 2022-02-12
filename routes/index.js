const express = require('express');
const router = express.Router();
const puppeterr = require('puppeteer')

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
router.get('/Proxy', (req, res, next) => {


  res.render('Proxy', {
    title: 'Proxy'

  });
});
router.get('/urlsee', async (req, res, next) => {
  const { url } = req.body
  console.log(url);
  if (!url) {
    return res.send('Bunday Url manzil mavjud emas')
  } else {
    try {
      const browser = await puppeterr.launch({ headless: false })
      const page = browser.newPage()

      await page.goto(`${url}`)
      let document = await page.evaluate(() => {
        return {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
          deviceScaleFactor: window.devicePixelRatio,
        };

      })


      return res.send( document)
    } catch (error) {
      console.log(error);
      return res.send(error)
    }
  }


});

module.exports = router;
