# trivia-search
Trivia Search is a project that uses Google's Cloud Vision and Custom Search APIs to answer trivia questions.

## Setup
### Google Cloud Vision
1. Sign up for [Google Cloud](https://cloud.google.com/) to use Google's Cloud Vision API (you will need to enter your credit card information, but they promise not to bill you without confirming with you first)
2. Within your [Google Cloud dashboard](https://console.cloud.google.com/home/dashboard), create a new project.
3. Download the [Google Cloud SDK](https://cloud.google.com/sdk/downloads#versioned)
4. Unzip and `cd` into the `google-cloud-sdk` directory. Run `./install.sh`
5. When prompted to 'Modify profile to update your $PATH and enable shell command completion?', respond 'Y' or press enter
6. In a new Terminal window, run `gcloud init`

### Custom Google Search Engine
1. Create a `keys.js` file in the `trivia-search` directory
2. Open the file and add the following code:
```module.exports = {
    API_KEY: 'PASTE_KEY_HERE',
    CUSTOM_SEARCH_ENGINE: 'PASTE_SEARCH_ENGINE_HERE'
}
```
3. On the [Google CSE page](https://cse.google.com/cse/all), create a new search engine by clicking 'Add'
4. Enter 'www.example.com' under 'Sites to Search'
5. Name your search engine (or leave it as 'Example')
6. Click on 'Custom Search Engine' to navigate back to the homepage
7. Click on your new search engine's name
8. Under 'Sites to Search', click the box next to 'www.example.com' and click the 'Delete' button above. Confirm the deletion by pressing 'OK'
9. Scroll to the bottom of the page and click 'Update'
10. Scroll back up and click 'Search engine ID' in the details section
11. Replace the `PASTE_KEY_HERE` text in `keys.js` with the Search engine ID
12. On the [Custom Search JSON/Atom API page](https://developers.google.com/custom-search/json-api/v1/overview), scroll to the 'API key section'
13. Click 'Get a key' and select the Google Cloud project you created in the Google Cloud Vision setup section
14. Replace the `PASTE_SEARCH_ENGINE_HERE` text in `keys.js` with the API key you just created 

## Run
```
git clone git@github.com:bzsinger/trivia-search.git
cd trivia-search
npm install
node index.js /PATH/TO/[filename].png
```
