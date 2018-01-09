const vision = require('@google-cloud/vision');
const questionType = require('./question-type.js');
const standardQuestion = require('./standard-question.js');
const theseQuestion = require('./these-question.js');
const extractQA = require('./extract-qa.js')

// Creates a client
const client = new vision.ImageAnnotatorClient();

const fileName = process.argv[2];

var fullText;
// Performs text detection on the local file
client
  .textDetection(fileName)
  .then(results => {

    const detections = results[0].textAnnotations;
    fullText = detections[0]['description'];

    var dict = extractQA(fullText);
    var question = dict['question'];
    var answers = dict['answers'];

    console.log('Question: ' + question);
    console.log('Answers: ' + answers);

    var negative = false;
    if (questionType.negative(question)) {
      question = question.toLowerCase().replace('not', '').replace('never', '');
      negative = true;
    }

    if (questionType.standard(question)) {
      standardQuestion(question, answers, negative);
    } else {
      theseQuestion(question, answers, negative);
    }
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
