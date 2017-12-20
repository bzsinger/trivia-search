exec 3>&2
exec 2> /dev/null
exec 2>&3
defaults write com.apple.screencapture location ~/Desktop
killall SystemUIServer
