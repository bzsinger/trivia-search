module.exports = exports = extractQA;

function extractQA(fullText) {
  fullText = removePrefix(fullText);

  var question = getQuestion(fullText);
  var answers = getAnswers(fullText);
  return {question: question, answers: answers};
}

function removePrefix(text) {
  // If questions are prefixed with 'Q1:' or '1:', remove the prefix to prevent
  // it from obscuring the question
  return text.replace(/([A-Z][1-9]+:)/g, '').replace(/([1-9]+:)/g, '').trim();
}

function getQuestion(text) {
  var questionEnd = getQuestionEndingIndex(text);

  // Replace all whitespace in question with single spaces
  return text.substring(0, questionEnd).replace(/[\s]/g, ' ');
}

function getAnswers(text) {
  text = text.replace(/([A-Z][1-9]+:)/g, '').replace(/([1-9]+:)/g, '').trim()

  // Get the answers by splitting on newline
  var questionEnd = getQuestionEndingIndex(text);

  var answers = text.substring(questionEnd + 1).trim().split('\n');

  return answers;
}

function getQuestionEndingIndex(text) {
  // If question ends with colon instead of question mark (like some The Q
  // questions), use ':' as the end of the question
  var end = text.indexOf('?');
  if (end < 0) {
    end = text.indexOf(':');
  }
  return end;
}
