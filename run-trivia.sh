defaults write com.apple.screencapture location $PWD/test
killall SystemUIServer

control_c()
# run if user hits control-c
{
  printf "\nCleaning up...\n"
  exec 3>&2
  exec 2> /dev/null
  exec 2>&3
  defaults write com.apple.screencapture location ~/Desktop
  killall SystemUIServer
  echo > ./test/.gitignore
  echo "Done"
  exit $?
}

# trap keyboard interrupt (control-c)
trap control_c SIGINT

echo "Welcome to Trivia Search!"

while true
do
  exec 3>&2
  exec 2> /dev/null
  mkdir test-completed
  rm ./test/.gitignore
  for filename in ./test/*; do
      node index.js "$filename"
      mv "$filename" test-completed/
      say -v Alex -f "./answer.txt" -r 250
      rm "./answer.txt"
  done
  exec 2>&3
done
