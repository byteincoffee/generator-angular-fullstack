'use strict';

var config = require('./../../config/environment');
var https = require('https');

function verify(response, callback) {
  https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + encodeURIComponent(config.recaptcha.clientSecret) + "&response=" + encodeURIComponent(response), function (res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk.toString();
    });
    res.on('end', function () {
      try {
        var parsedData = JSON.parse(data);
        callback(parsedData.success);
      } catch (e) {
        callback(false);
      }
    });
  });
}

exports.verify = verify;
