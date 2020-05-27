# trivia-search
Trivia Search is a project that uses Google's Cloud Vision and Custom Search APIs to answer trivia questions.

Inspired by [Toby Mellor](https://medium.com/@tobymellor/hq-trivia-using-bots-to-win-money-from-online-game-shows-ce2a1b11828b).

>NOTE: This violates HQ Trivia’s Terms of Service if used in a live game. Therefore I have never used this during a live game and the above proof-of-concept demonstration is performed on a previous recorded game found on YouTube. I don’t condone the use of a bot in a live game.
>>You shall not (directly or indirectly): […] (v) use manual or automated software, devices, or other processes to “crawl” or “spider” any page of the App; (vi) harvest or scrape any Content from the Services;'

## Demo
<img src='http://i.imgur.com/zq8NOeq.gif' title='Final Cut Question' width='' alt='Final Cut Question'/>

GIF created with [LiceCap](http://www.cockos.com/licecap/).
## Setup (Mac)
### Clone the Project
* `git clone git@github.com:bzsinger/trivia-search.git`

### Google Cloud Vision
1. Sign up for [Google Cloud](https://cloud.google.com/) to use Google's Cloud Vision API
2. Within your [Google Cloud dashboard](https://console.cloud.google.com/home/dashboard), create a new project
3. Download the [Google Cloud SDK](https://cloud.google.com/sdk/downloads#versioned)
4. If the SDK downloads as a zip file, unzip and `cd` into the `google-cloud-sdk` directory. Run `./install.sh`
5. When prompted to 'Modify profile to update your $PATH and enable shell command completion?', respond 'Y' and press enter
6. In a new Terminal window, run `gcloud init` in the `google-cloud-sdk` folder

### Custom Google Search Engine
1. Create a `keys.js` file in the `trivia-search` directory
2. Open the file and add the following code:
```
module.exports = {
    API_KEY: 'PASTE_KEY_HERE',
    CUSTOM_SEARCH_ENGINE: 'PASTE_SEARCH_ENGINE_ID_HERE'
}
```
3. On the [Google CSE page](https://cse.google.com/cse/all), create a new search engine by clicking 'Add'
4. Enter 'www.example.com' under 'Sites to Search'
5. Click on 'Create' and navigate back to the homepage
6. Click on your new search engine's name
7. Under 'Sites to Search', click the box next to 'www.example.com' and then click the 'Delete' button. Confirm the deletion by pressing 'OK'
8. Set 'Search the entire web' to 'On' 
8. Scroll back up and click 'Search engine ID' in the details section
9. Replace the `PASTE_SEARCH_ENGINE_ID_HERE` text in `keys.js` with the Search engine ID
10. On the [Custom Search JSON page](https://developers.google.com/custom-search/json-api/v1/overview), scroll to the 'API key section'
11. Click 'Get a key' and select the Google Cloud project you created earlier
12. Replace the `PASTE_KEY_HERE` text in `keys.js` with the API key you just created

### Google Authentication
1. On the [Getting Started with Authentication](https://cloud.google.com/docs/authentication/getting-started) page, within the 'Creating a service account' section, click on the 'Go to the Create Service Account Key page' button
2. Ensure that the project you are creating a service key for is the project you created earlier 
3. Under 'Service Account', select 'New Service Account'
4. Name the service account and set your role as 'Project > Owner'
5. Ensure the key type is JSON and click the 'Create' button
6. Continuing with the instructions from the [Getting Started with Authentication](https://cloud.google.com/docs/authentication/getting-started) page, after you've downloaded your key, place it in the directory of your choice
7. Run `export GOOGLE_APPLICATION_CREDENTIALS="/[PATH]/[FILE_NAME].json"`, replacing `PATH` with the path to your key and `FILE_NAME` with your key's file name
8. Enable Google Cloud Vision for the project by navigating to the [Cloud Vision API page](https://console.developers.google.com/apis/library/vision.googleapis.com), ensure the project is correct, and click 'Enable'

### Billing
**NOTE:** You may be billed if you run too many custom searches or Cloud Vision queries
1. Navigate to the [Billing page](https://console.developers.google.com/billing/enable) and click 'Create Billing Account'
2. Ensure the project and the billing account details are correct
3. Name the billing account and click 'Continue'
4. Complete the billing profile and click 'Submit and enable billing'

### Optional: Remove Mac Screenshot Thumbnail
* Waiting for Mac screenshot thumbnail may delay your results. Disable it by following the instructions [here](https://osxdaily.com/2019/08/02/disable-screenshot-thumbnail-preview-mac/).

## Run
```
cd trivia-search
npm install
./run-trivia.sh
```

Take screenshots of trivia questions and answers (see example above)

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
