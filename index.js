var system = require('system');
console.log(system.env.ZIP);
var env = system.env;
var pizzaUrl = env.PIZZA_URL;
var zip = env.ZIP;

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
  /fbds/gi,
]

var webPage = require('webpage');
var page = webPage.create();
page.settings.resourceTimeout = 1000;
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

  url = pizzaUrl + zip;
  console.log(url);
  page.open(url, function(status) {
    if(status != 'success') {
      console.log("RESET " + zip);
      phantom.exit();
    }
    window.setTimeout(function() {
      var str = page.plainText;
      if (str.indexOf("PLEASE") >= 0) {
        phantom.exit();
      }
      if (!(str.indexOf("STORE #") >= 0)) {
        console.log("RESET " + zip);
      }
      console.log(str);
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
    }, 1000);
  });
