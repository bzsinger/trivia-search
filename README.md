# trivia-search
Trivia Search is a project that uses Google's Cloud Vision and Custom Search APIs to answer trivia questions.

## Setup
1. Sign up for [Google Cloud](https://cloud.google.com/) to use Google's Cloud Vision API
2. Within your [Google Cloud dashboard](https://console.cloud.google.com/home/dashboard), create a new project.
3. Download the [Google Cloud SDK](https://cloud.google.com/sdk/downloads#versioned)
4. Unzip and `cd` into the `google-cloud-sdk` directory. Run `./install.sh`
5. When prompted to 'Modify profile to update your $PATH and enable shell command completion?', respond 'Y' or press enter
6. In a new Terminal window, run `gcloud init`

## Run
```
git clone git@github.com:bzsinger/trivia-search.git
cd trivia-search
node index.js /PATH/TO/[filename].png
```
