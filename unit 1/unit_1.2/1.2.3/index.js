function readHttpLikeInput() {
  var fs = require("fs");
  var res = "";
  var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
  let was10 = 0;
  for (; ;) {
    try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) { break; /* windows */ }
    if (buffer[0] === 10 || buffer[0] === 13) {
      if (was10 > 10)
        break;
      was10++;
    } else
      was10 = 0;
    res += new String(buffer);
  }

  return res;
}

let contents = readHttpLikeInput();

function outputHttpResponse(statusCode, statusMessage, headers, body) {
  console.log(`HTTP/1.1 ${statusCode} ${statusMessage}\n${headers}\n\n${body}`);
}

function processHttpRequest($method, $uri, $headers, $body) {
  let statusCode;

  // define if $uri has the required parameters
  switch ($method) {
    case 'GET':
      $method = '200';
      statusCode = 'OK';
      checkTheUri();
      break;
    default:
      $method = '400';
      statusCode = 'Bad Request';
      $body = 'Bad Request';
      break;
  }

  // define if $uri has the required parameters
  function checkTheUri() {
    switch (true) {
      case /(?<=^\/sum\?nums=)[\d,]*$/.test($uri):
        $body = $uri.match(/(?<=^\/sum\?nums=)[\d,]*$/)[0].split(',')
          .reduce((acc, item) => {
            if (item === '') {
              item = 0;
            }
            return acc += parseFloat(item);
          }, 0);
        break;
      case /^\/sum/.test($uri):
        $method = '400';
        statusCode = 'Bad Request';
        $body = statusCode.toLowerCase();
        break;
      default:
        $method = '404';
        statusCode = 'Not Found';
        $body = statusCode.toLowerCase();
        break;
    }
  }

  // create a headers
  $headers = `Date: ${new Date()}\nServer: Apache/2.2.14 (Win32)\nContent-Length: ${$body.toString().length}\nConnection: Closed\nContent-Type: text/html; charset=utf-8`

  outputHttpResponse($method, statusCode, $headers, $body);
}

function parseTcpStringAsHttpRequest($string) {
  let arr = $string.split('\n');
  let methodValue = arr[0].split(' ')[0];
  let uriValue = arr[0].split(' ')[1];
  let headeValue = arr.reduce((acc, item, index) => {
    if (index === arr.length - 1) {
      return acc;
    }
    if (index > 0 && item !== '') {
      item = item.split(': ');
      if ((item[0] = item[0].trim()) === 'HOST') {
        item[0] = item[0].charAt(0) + item[0].slice(1).toLowerCase()
      }
      acc[item[0]] = item[1].trim();
    }
    return acc;
  }, {});
  // define the body of the request
  let bodyValue
  arr[arr.length - 1] === '' ? bodyValue == '' : bodyValue = arr[arr.length - 1];

  return {
    method: methodValue,
    uri: uriValue,
    headers: headeValue,
    body: bodyValue
  };
}

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);