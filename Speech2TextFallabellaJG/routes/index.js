const express = require('express');
const router = express.Router();
const speechToText = require('../controllers/SpeechToText');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prueba Voz a texto, José' });
});
router.post('/v1/parse', speechToText.parseSpeechToText);
module.exports = router;
