// var DDG = require('node-ddg-api').DDG;

// var ddg = new DDG('h_');

// ddg.instantAnswer('squids', {skip_disambig: '0',ia:'web'}, function(err, response) {
//   console.log(response);
// });
var MediaWiki = require("mediawiki");
var bot = new MediaWiki.Bot();
bot.get({ action: "abusefiltercheckmatch",format:'json',prop:'images',titles:'European anchovy'}).complete(function (response) {
    console.log(response);
});