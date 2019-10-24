'use strict';

// [START speech_quickstart]
async function parseSpeechToText() {
    // Imports the Google Cloud client library
    console.log('Transformando audio a texto...');

    const speech = require('@google-cloud/speech');
    const fs = require('fs');

    // Creates a client
    const client = new speech.SpeechClient();

    // The name of the audio file to transcribe
    const fileName = '../public/audios/001.wav';

    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
        content: audioBytes,
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

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    console.log(JSON.stringify(response));
    console.log(`Transcription: ${transcription}`);
}

parseSpeechToText().catch(console.error);

module.exports ={
    parseSpeechToText:parseSpeechToText
}