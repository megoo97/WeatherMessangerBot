var querystring = require('querystring');
var https = require('https');
var responseString;
var host = 'api.openweathermap.org';
var location= 'London,uk';
var path="/data/2.5/weather";
var appId= 'fcf6adb2305a23b3226dd330bc8f9563';


function performRequest(endpoint, method, data, success) {
  var dataString = JSON.stringify(data);
  var headers = {};
  
  if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length
    };
  }
  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
    //  console.log(responseString);
      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });

  req.write(dataString);
  req.end();
}




module.exports = 
{
  getAppId:function()
  {
    return appId;
  },

  test:function (requestBody,callback)
{
  performRequest(path, 'GET', requestBody, function(data) {
    if(data.cod!=200)
      data=null;
  callback(data); 
  });

     
}
}

    
