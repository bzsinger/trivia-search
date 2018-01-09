module.exports = exports = getResults;

function getResults(responseString, answers, printAnswerBits) {
  var answerNums = [];

  // To avoid a div. by 0 error
  var totalCount = 1;

  var sanitizedAnswers = sanitizeAnswers(answers);
  for (i = 0; i < sanitizedAnswers.length; i++) {
    var numOccur = 0;
    numOccur += occurrences(responseString, answers[i], false);

    answerNums.push(numOccur);
    totalCount += numOccur;
  }

  // Only split up answer into bits if only found 9 total instances of
  // all answers
  if (totalCount <= 10) {
    answerNums = [];

    for (i = 0; i < sanitizedAnswers.length; i++) {
      var numOccur = 0;

      var answerBits = sanitizedAnswers[i].split(' ');
      for (j = 0; j < answerBits.length; j++) {
        if (!trivialWords.includes(answerBits[j])) {
          numOccur += occurrences(responseString, answerBits[j], false);
        }
      }
      answerNums.push(numOccur);
    }
    if (printAnswerBits) {
      console.log('CAUTION: Using answer bits');
    }
  }
  return answerNums;
}

function sanitizeAnswers(answers) {
  var sanitizedAnswers = []
  // Replace all alphanumeric characters with spaces
  for (i = 0; i < answers.length; i++) {
    sanitizedAnswers.push(answers[i].replace(/[^A-Za-z0-9'-*\s]/g, '')
    .replace(/[\s]/g, ' '))
  }
  return sanitizedAnswers;
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

const trivialWords = ['the', 'a']
