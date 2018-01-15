  var fs = require('fs');

module.exports = exports = printResults;

function printResults(answerNums, answers, negative) {
  var bestPct = 0;
  var max = true;
  if (negative) {
    console.log('WARNING: NOT/NEVER QUESTION')
    max = false;
    bestPct = 1;
  }

  var totalCount = 1;
  for (i = 0; i < answerNums.length; i++) {
    totalCount += answerNums[i];
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

  var tldr = '';
  var answerString = '';
  var guess = false;
  for (i = 0; i < answers.length; i++) {
    var score = (answerPcts[i] * 100).toFixed(2)
    if (answerPcts[i] === bestPct) {
      answerString += (i+1) + ': ' + answers[i] + ': ' + score + '% (best answer)\n'
      if (tldr.length > 0) {
        tldr += ', ' + (i+1);
        if (!guess) {
          tldr = 'Guess: ' + tldr;
          guess = true;
        }
      } else {
        tldr += (i+1);
      }
    } else {
      answerString += (i+1) + ': ' + answers[i] + ': ' + score + '%\n'
    }
  }
  console.log(answerString);
  console.log('Answer: ' + tldr);
  console.log();

  fs.writeFileSync("answer.txt", tldr.replace(/[^A-Za-z0-9\s]/g, ''));
}
