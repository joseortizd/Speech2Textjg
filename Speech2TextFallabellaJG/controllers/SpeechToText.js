'use strict';
let validator = require('validator');

/* Funcionalidad principal de la aplicación, recibe un audio base 64 y lo devuelve como texto. */
async function parseSpeechToText(req, res, next) {
    /* Se verifica que la petición no venga vacía, además que la propiedad audio esté definida. */
    if (Object.keys(req.body).length === 0 || !req.body.audio || !validator.isBase64(req.body.audio)) {
        /* En caso que exista algún error en la petición se retorna error 400. */
        res.status(400).json({
            status: 'Bad Request',
            response: 'Solicitud incompleta'
        });
        return false;
    } else {
        /* Si la petición es válida, se incluye la dependencia speech de Google Cloud y se instancia un cliente. */
        const speech = require('@google-cloud/speech');
        const client = new speech.SpeechClient();
        /* El audio de la petición se guarda en la variable audio, para ser enviada posteriormente. */
        const audio = {
            content: req.body.audio,
        };
        /* Se configura el idioma, la cantidad de canales (por si el audio es stereo) asi como el
        reconocimiento de cada canal. */
        const config = {
            languageCode: 'es-ES',
            audioChannelCount: 1,
            enableSeparateRecognitionPerChannel: false
        };
        /* Se configura la solicitud a ser realizada. */
        const request = {
            audio: audio,
            config: config,
        };
        /* Se utiliza la función recognize del cliente speech. */
        const [response] = await client.recognize(request).catch(error => {
            res.status(500).json({
                status: 'Internal Server Error',
                response: error.toString()
            })
        });
        /* Se retorna la respuesta. */
        res.status(200).json({
            status: 'OK',
            response: returnResponse(response.results)
        })
    }
}
/* Este método se usa por si la aplicación detecto mas de una transcripción para un mismo audio. */
function returnResponse(results) {
    let response = [];
    results.forEach((transcripcion) => {
        response.push(
            {
                'Transcripcion' : transcripcion.alternatives[0].transcript
            });
    });
    return response;
}

module.exports ={
    parseSpeechToText:parseSpeechToText
}