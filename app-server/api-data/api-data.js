var fs = require('fs');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//function call to get and return stock chart info
module.exports.getData = function(req, res, next) { 
    sendJSONresponse(req, res, {});
}
