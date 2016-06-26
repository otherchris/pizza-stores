#!/usr/bin/ruby
#
count = 0;
out = "";
ARGF.each do |line|
  if line.include? "RESET" then
    File.open('zipcodes/retry',"w+"){ |file| file << line.match(/\d{5}/)[0] }
  end
  if line.include? "STORE #" then
    count = 3;
  end
  if count > 0 then
    out << "#{line.chomp};"
    count -= 1
  end
  if count == 0 then
    out << "\n"
    puts out
    out = ""
    count -= 1
  end
end
