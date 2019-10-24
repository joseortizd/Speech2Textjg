const express = require('express');
const router = express.Router();
const speechToText = require('../controllers/SpeechToText');
/* GET Pagina de inicio. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prueba Voz a texto, José' });
});
/* POST Página de conversión audio a texto. */
router.post('/v1/parse', speechToText.parseSpeechToText);
module.exports = router;
