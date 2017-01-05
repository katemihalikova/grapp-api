const request = require('request');
const cheerio = require('cheerio');

request('http://provoz.szdc.cz/grappnv/', function (error, response, html) {
  if (error) {
    console.log(error);
    return process.exit(1);
  }
  if (response.statusCode >= 400) {
    console.log(response);
    return process.exit(response.statusCode);
  }

  let $ = cheerio.load(html);
  console.log($("#token").val());
});
