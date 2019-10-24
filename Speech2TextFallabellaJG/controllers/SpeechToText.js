'use strict';

// [START speech_quickstart]
async function parseSpeechToText(req, res, next) {
    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');
  //  const fs = require('fs');
    // Creates a client
    const client = new speech.SpeechClient();

    // The name of the audio file to transcribe
 //   const fileName = '../public/audios/001.wav';

    // Reads a local audio file and converts it to base64
   // const file = fs.readFileSync(fileName);
    if (!req.body[0].audio) {
        res.status(400).json({
            status: 'Bad Request',
            response: 'Solicitud incompleta'
        });
        return false;
    } else {
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