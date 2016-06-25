var system = require('system');
var env = system.env;
var pizzaUrl = env.PIZZA_URL;
//var zips = require(env.ZIPS);
var Zips = require(env.ZIPS);
console.log(pizzaUrl);

var resourcePatterns = [
  /dmtry/gi,
  /http:\/\/.+?\.css/gi,
  /.*gif/gi,
  /.*png/gi,
  /calorie/gi,
  /tealium/gi,
  /channel/gi,
  /conversion/gi,
  /adsrvr/gi,
  /fbds/gi];
var webPage = require('webpage');
var page = webPage.create();
page.settings.resourceTimeout = 900;
page.onResourceTimeout = function(e) {
  console.log("Timeout: " + e.url);
}
page.onResourceRequested = function(requestData, request) {
  resourcePatterns.forEach(function(patt) {
    if (patt.test(requestData['url']) || requestData['Content-Type'] == 'text/css') {
        console.log('The url of the request is matching. Aborting: ' + requestData['url']);
        request.abort();
    }
  });
};

Zips.zips.forEach(function(zip) {
  url = pizzaUrl + zip;
  console.log(url);
  page.open(url, function(status) {

    if(status != 'success') {
      console.log("PROBLEMS");
      phantom.exit();
    }
    window.setTimeout(function() {
      console.log(page.plainText);
      console.log(new Date().getTime() - start_all);
      phantom.exit();
      /*cont.content = page.content;
      var nodes = cont.evaluate(function(s) {
        return document.querySelectorAll(s)
      }, ".js-search-result");
      console.log(nodes.length);
      [].)orEach.call(nodes, function(node){
        if(node) {
          console.log(node.textContent);
        }
      });*/
    }, 800);
  });
});










