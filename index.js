const vision = require('@google-cloud/vision');
const questionType = require('./helper-modules/question-type.js');
const standardQuestion = require('./helper-modules/standard-question.js');
const theseQuestion = require('./helper-modules/these-question.js');
const extractQA = require('./helper-modules/extract-qa.js')

// Creates a client
const client = new vision.ImageAnnotatorClient();

const fileName = process.argv[2];

// Performs text detection on the local file
client
  .textDetection(fileName)
  .then(results => {
    const detections = results[0].textAnnotations;
    var fullText = detections[0]['description'];

    var dict = extractQA(fullText);
    var question = dict['question'];
    var answers = dict['answers'];

    if (question.trim().length == 0) {
      questionArray = answers.slice(0, answers.length - 3)
      answers = answers.slice(answers.length - 3, answers.length)

      question = ""
      for (var i = 0; i < questionArray.length; i++) {
        question += questionArray[i]
      }

      console.log("WARNING: Difficulty parsing question")
    }

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
