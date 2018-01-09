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

  for (i = 0; i < answers.length; i++) {
    var score = (answerPcts[i] * 100).toFixed(2)
    if (answerPcts[i] === bestPct) {
      console.log(answers[i] + ': ' + score + '% (best answer)')
    } else {
      console.log(answers[i] + ': ' + score + '%')
    }
  }
  console.log();
}
