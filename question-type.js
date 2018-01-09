module.exports.standard = standard;
module.exports.these = these;
module.exports.negative = negative;

function standard(question) {
  return !these(question);
}

function these(question) {
  question = question.toLowerCase();
  return question.indexOf('these') >= 0
    || question.indexOf('the following') >= 0;
}

function negative(question) {
  question = question.toLowerCase();
  return not(question) || never(question);
}

function not(question) {
  question = question.toLowerCase();
  return question.indexOf('not') >= 0;
}

function never(question) {
  question = question.toLowerCase();
  return question.indexOf('never') >= 0;
}
