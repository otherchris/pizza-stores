#!/usr/local/bin/zsh

./get-pizza-page.sh "https://www.dominos.com/en/pages/order/#/locations/search/?type=Locations&c=" "73160" | ./readStores.rb
