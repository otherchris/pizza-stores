var system = require('system');
var env = system.env;
var pizzaUrl = env.PIZZA_URL;
var zip = env.ZIP;

console.log(pizzaUrl);
console.log(zip);

var logTime = function(name, part, whole) {
  console.log(name + "time: " + part + ", Total: " + whole);
}

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
var start_all = new Date().getTime();
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

var end_create = new Date().getTime();
logTime("boot and create: ", end_create - start_all, end_create - start_all);

var zips = ['40204'];

zips.forEach(function(zip) {
  url = 'https://www.dominos.com/en/pages/order/#/locations/search/?type=Locations&c=' + zip;
  page.open(url, function(status) {

    var end_open = new Date().getTime();
    logTime("open the page: ", end_open - end_create, end_open - start_all);

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











