'use strict';

/* Funcionalidad principal de la aplicación, recibe un audio base 64 y lo devuelve como texto. */
async function parseSpeechToText(req, res, next) {
    /* Se verifica que la petición no venga vacía, además que la propiedad audio esté definida. */
    if (Object.keys(req.body).length === 0 || !req.body[0].audio ) {
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
            content: req.body[0].audio,
        };
        /* Se configura el idioma, la cantidad de canales (por si el audio es stereo) asi como el
        reconocimiento de cada canal. */
        const config = {
            languageCode: 'es-ES',
            audioChannelCount: 2,
            enableSeparateRecognitionPerChannel: true
        };
        /* Se configura la solicitud a ser realizada. */
        const request = {
            audio: audio,
            config: config,
        };
        /* Se utiliza la función recognize del cliente speech. */
        const [response] = await client.recognize(request);
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
    results.forEach((a) => {
        response.push(
            {
                'Posible Texto' : a.alternatives[0].transcript
            });
    });
    /* Se retorna un arreglo filtrando los resultados que sean idénticos en la respuesta de la aplicación */
    return Array.from(new Set(response.map(JSON.stringify))).map(JSON.parse);
}

module.exports ={
    parseSpeechToText:parseSpeechToText
}