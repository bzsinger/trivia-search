# trivia-search
Trivia Search is a project that uses Google's Cloud Vision and Custom Search APIs to answer trivia questions.

Inspired by [Toby Mellor](https://medium.com/@tobymellor/hq-trivia-using-bots-to-win-money-from-online-game-shows-ce2a1b11828b).

>NOTE: This violates HQ Trivia’s Terms of Service if used in a live game. Therefore I have never used this during a live game and the above proof-of-concept demonstration is performed on a previous recorded game found on YouTube. I don’t condone the use of a bot in a live game.
>>You shall not (directly or indirectly): […] (v) use manual or automated software, devices, or other processes to “crawl” or “spider” any page of the App; (vi) harvest or scrape any Content from the Services;"

## Demo
<img src='http://i.imgur.com/zq8NOeq.gif' title='Final Cut Question' width='' alt='Final Cut Question'/>

GIF created with [LiceCap](http://www.cockos.com/licecap/).
## Setup
### Google Cloud Vision
1. Sign up for [Google Cloud](https://cloud.google.com/) to use Google's Cloud Vision API
2. Within your [Google Cloud dashboard](https://console.cloud.google.com/home/dashboard), create a new project
3. Download the [Google Cloud SDK](https://cloud.google.com/sdk/downloads#versioned)
4. Unzip and `cd` into the `google-cloud-sdk` directory. Run `./install.sh`
5. When prompted to 'Modify profile to update your $PATH and enable shell command completion?', respond 'Y' and press enter
6. In a new Terminal window, run `gcloud init` in the `google-cloud-sdk` folder

### Custom Google Search Engine
1. Create a `keys.js` file in the `trivia-search` directory
2. Open the file and add the following code:
```
module.exports = {
    API_KEY: 'PASTE_KEY_HERE',
    CUSTOM_SEARCH_ENGINE: 'PASTE_SEARCH_ENGINE_HERE'
}
```
3. On the [Google CSE page](https://cse.google.com/cse/all), create a new search engine by clicking 'Add'
4. Enter 'www.example.com' under 'Sites to Search'
5. Click on 'Custom Search Engine' to navigate back to the homepage
6. Click on your new search engine's name
7. Under 'Sites to Search', click the box next to 'www.example.com' and then click the 'Delete' button. Confirm the deletion by pressing 'OK'
8. Scroll to the bottom of the page and click 'Update'
9. Scroll back up and click 'Search engine ID' in the details section
10. Replace the `PASTE_KEY_HERE` text in `keys.js` with the Search engine ID
11. On the [Custom Search JSON/Atom API page](https://developers.google.com/custom-search/json-api/v1/overview), scroll to the 'API key section'
12. Click 'Get a key' and select the Google Cloud project you created earlier
13. Replace the `PASTE_SEARCH_ENGINE_HERE` text in `keys.js` with the API key you just created

## Run
```
git clone git@github.com:bzsinger/trivia-search.git
cd trivia-search
npm install
./run-trivia.sh
```
(Ctrl-C to exit)

## Repository Structure
```
|- helper-modules
|--- extract-qa.js - extracts question and answers from given text
|--- get-results.js - parses given search results
|--- print-results.js - prints results to the console in a human-readable format
|--- question-type.js - quick functions for categorizing a question (standard, these, negative)
|--- search.js - conducts a Google search for given text and returns a parsing of the results
|--- standard-question.js - protocol for handling a standard question
|--- these-question.js - protocol for handling a question that contains 'these' or 'the following'
|- test - landing folder for screenshots
|- test-completed - created by run script, stores screenshots post-parsing
|- index.js - conducts OCR and passes text along to search
|- keys.js - stores keys for search
|- package.json - project meta-information
|- README.md - you're here
|- run-trivia.sh - a script to easily run this project
```
