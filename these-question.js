const search = require('./search.js')
const printResults = require('./print-results.js')

module.exports = exports = theseQuestion;

function theseQuestion(question, answers, negative) {
  console.log('CAUTION: \'these\' question');

  var clue = getClue(question);

  var totals = [];

  search(answers[0], [clue], false, function(results) {
      totals.push(results[0]);
      search(answers[1], [clue], false, function(results) {
          totals.push(results[0]);
          search(answers[2], [clue], false, function(results) {
            totals.push(results[0]);
            printResults(totals, answers, negative);
          })
      })
  })
}

function getClue(question) {
  return removeFront(question.trim());
}

function removeFront(question) {
  var theseIndex = question.indexOf('these');
  if (theseIndex === question.length - 5) {
    question = question.substring(0, theseIndex)
  } else {
    question = question.substring(theseIndex + 5).trim();
  }

  for (i = 0; i < verbs.length; i++) {
    if (question.substring(0, verbs[i].length) === verbs[i]) {
      question = question.substring(verbs[i].length).trim();
      break;
    }
  }

  for (i = 0; i < articles.length; i++) {
    if (question.substring(0, articles[i].length) === articles[i]) {
      question = question.substring(articles[i].length).trim();
      break;
    }
  }
  return question;
}

const verbs = ['is', 'has', 'was', 'had'];
const articles = ['the', 'a', 'an'];
