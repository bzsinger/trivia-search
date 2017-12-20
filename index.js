const vision = require('@google-cloud/vision');
const request = require('request');
const keys = require('./keys.js');

// Creates a client
const client = new vision.ImageAnnotatorClient();

const fileName = process.argv[2];
const url = 'https://www.googleapis.com/customsearch/v1?key=' + keys.API_KEY + '&cx=' + keys.CUSTOM_SEARCH_ENGINE + '&q='

var fullText;
// Performs text detection on the local file
client
  .textDetection(fileName)
  .then(results => {
    const detections = results[0].textAnnotations;
    fullText = detections[0]['description'];
    var question = getQuestion(fullText);
    var answers = getAnswers(fullText);

    console.log('Question: ' + getQuestion(fullText));
    console.log('Answers: ' + getAnswers(fullText));

    const fullURL = url + encodeURIComponent(question);

    request(fullURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var responseString = JSON.stringify(response);

            var answerNums = [];
            // To avoid a div. by 0 error
            var totalCount = 1;
            for (i = 0; i < answers.length; i++) {
              var numOccur = 0;
              var answerBits = answers[i].split(' ');
              for (j = 0; j < answerBits.length; j++) {
                numOccur += occurrences(responseString, answerBits[j], false);
              }

              answerNums.push(numOccur);
              totalCount += numOccur;

            }

            var bestPct = 0;
            answerPcts = []
            for (i = 0; i < answerNums.length; i++) {
              var score = answerNums[i] / totalCount;
              answerPcts.push(score)
              bestPct = Math.max(bestPct, score);
            }

            for (i = 0; i < answers.length; i++) {
              var score = (answerPcts[i] * 100).toFixed(2)
              if (answerPcts[i] === bestPct) {
                console.log(answers[i] + ": " + score + "% (best answer)")
              } else {
                console.log(answers[i] + ": " + score + "%")
              }
            }

            console.log();

         } else {
           console.error('ERROR:', error);
         }
    })
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

function getQuestion(text) {
  return text.substring(0, text.indexOf('?')).replace('\n', ' ');
}

function getAnswers(text) {
  return text.substring(text.indexOf('?') + 1).trim().split('\n');
}

function occurrences(paramString, paramSubString, allowOverlapping) {
    string = paramString.toLowerCase();
    subString = paramSubString.toLowerCase();
    string += '';
    subString += '';
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}
