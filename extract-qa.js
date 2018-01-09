module.exports = exports = extractQA;

function extractQA(fullText) {
  var question = getQuestion(fullText);
  var answers = getAnswers(fullText);
  return {question: question, answers: answers};
}

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
  return text.substring(0, questionEnd).replace(/[\s]/g, ' ');
}

function getAnswers(text) {
  // Get the three answers by splitting on newline
  var questionEnd = getQuestionEndingIndex(text);

  var answers = text.substring(questionEnd + 1).trim().split('\n');

  return answers;
}
