const search = require('./search.js');
const printResults = require('./print-results.js');

module.exports = exports = standardQuestion;

function standardQuestion(question, answers, negative) {
  search(question, answers, true, function(results) {
    printResults(results, answers, negative);
  });
}
