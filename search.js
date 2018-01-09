const keys = require('./keys.js');
const getResults = require('./get-results.js')
const request = require('request');

module.exports = exports = search;

const url = 'https://www.googleapis.com/customsearch/v1?key=' + keys.API_KEY +
  '&cx=' + keys.CUSTOM_SEARCH_ENGINE + '&q='

function search(text, answers, printAnswerBits, callback) {
  const fullURL = url + encodeURIComponent(text);
  request(fullURL, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      var responseString = JSON.stringify(response);

      callback(getResults(responseString, answers, printAnswerBits));

    } else {
      console.error('ERROR:', error);
    }
  })
}
