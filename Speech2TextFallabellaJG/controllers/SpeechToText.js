'use strict';
async function parseSpeechToText(req, res, next) {
    if (Object.keys(req.body).length === 0 || !req.body[0].audio ) {
        res.status(400).json({
            status: 'Bad Request',
            response: 'Solicitud incompleta'
        });
        return false;
    } else {
        const speech = require('@google-cloud/speech');
        const client = new speech.SpeechClient();
        const audio = {
            content: req.body[0].audio,
        };
        const config = {
            languageCode: 'es-ES',
            audioChannelCount: 2,
            enableSeparateRecognitionPerChannel: true
        };
        const request = {
            audio: audio,
            config: config,
        };
        const [response] = await client.recognize(request);
        res.status(200).json({
            status: 'OK',
            response: returnResponse(response.results)
        })
    }
}

function returnResponse(results) {
    let response = [];
    results.forEach((a) => {
        response.push(
            {
                'Posible Texto' : a.alternatives[0].transcript
            });
    })
    return Array.from(new Set(response.map(JSON.stringify))).map(JSON.parse);
}

module.exports ={
    parseSpeechToText:parseSpeechToText
}