#!/bin/bash

while read line
do
  ./get-pizza-page.sh "https://www.dominos.com/en/pages/order/#/locations/search/?type=Locations&c=" "$line" | ruby readStores.rb &
  wait
done < zipcodes/zip
