const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

const fileName = process.argv[2];

// Performs text detection on the local file
client
  .textDetection(fileName)
  .then(results => {
    const detections = results[0].textAnnotations;
    console.log('Text:');
    detections.forEach(text => console.log(text));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
