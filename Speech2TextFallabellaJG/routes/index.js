const express = require('express');
const router = express.Router();
const speechToText = require('../controllers/SpeechToText');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/parse', speechToText.parseSpeechToText);
module.exports = router;
