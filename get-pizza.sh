#!/usr/local/bin/zsh

while read line
do
  ./get-pizza-page.sh "https://www.dominos.com/en/pages/order/#/locations/search/?type=Locations&c=" "$line" &
  wait
done <_test
