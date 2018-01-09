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
              numOccur += occurrences(responseString, answers[i], false);

              answerNums.push(numOccur);
              totalCount += numOccur;
            }

            // Only split up answer into bits if only found 9 total instances of
            // all answers
            if (totalCount <= 10) {
              totalCount = 1;
              answerNums = []

              for (i = 0; i < answers.length; i++) {
                var numOccur = 0;

                var answerBits = answers[i].split(' ');
                for (j = 0; j < answerBits.length; j++) {
                  if (answerBits[j] !== "the") {
                    numOccur += occurrences(responseString, answerBits[j], false);
                  }
                }

                answerNums.push(numOccur);
                totalCount += numOccur;
              }
              console.log("CAUTION: Using answer bits");
            }


            var bestPct = 0;
            var max = true;
            if (occurrences(question, "not", false) !== 0 || occurrences(question, "never", false) !== 0) {
              console.log("WARNING: NOT/NEVER QUESTION")
              max = false;
              bestPct = 1;
            }

            answerPcts = [];
            for (i = 0; i < answerNums.length; i++) {
              var score = answerNums[i] / totalCount;
              answerPcts.push(score)
              if (max) {
                bestPct = Math.max(bestPct, score);
              } else {
                bestPct = Math.min(bestPct, score);
              }
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

function getQuestionEndingIndex(text) {
  var end = text.indexOf('?');
  if (end < 0) {
    end = text.indexOf(':');
  }
  return end;
}

function getQuestion(text) {
  // If question ends with colon instead of question mark (like some The Q
  // questions), use ':' as the end of the question
  var questionEnd = getQuestionEndingIndex(text);

  // Replace all whitespace in question with single spaces
  return text.substring(0, questionEnd).replace('/\s/g', ' ');
}

function getAnswers(text) {
  // Get the three answers by splitting on newline
  var questionEnd = getQuestionEndingIndex(text);

  var answers = text.substring(questionEnd + 1).trim().split('\n');

  // Replace all alphanumeric characters with spaces
  for (i = 0; i < answers.length; i++) {
    answers[i] = answers[i].replace('/[^A-Za-z0-9]/', ' ');
    //.replace(new RegExp('(the)', 'gi'), ' ')
  }

  return answers
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
