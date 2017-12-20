defaults write com.apple.screencapture location ~/Desktop/trivia-search/test
killall SystemUIServer
while true
do
  exec 3>&2
  exec 2> /dev/null
  mkdir test-completed
  for filename in ./test/*.png; do
      node index.js "$filename"
      mv "$filename" test-completed/
  done
  exec 2>&3
done
