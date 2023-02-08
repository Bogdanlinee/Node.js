let contents = `GET /another/file.txt HTTP/1.1 
Host: another.shpp.me 
Accept: image/gif, image/jpeg, */* 
Accept-Language: en-us 
Accept-Encoding: gzip, deflate 
User-Agent: Mozilla/4.0 
Content-Length: 35

bookId=12345&author=Tan+Ah+Teck`;

function outputHttpResponse(statusCode, statusMessage, headers, body) {
  console.log(`HTTP/1.1 ${statusCode} ${statusMessage}\n${headers}\n\n${body}`);
}

function processHttpRequest($method, $uri, $headers, $body) {
  let statusCode;
  let folderToUse;

  switch ($method) {
    case 'GET':
      statusCode = '200';
      $method = 'OK';
      let validatioResult = validateHeader();
      if (!validatioResult) {
        break;
      }
      validateUri();
      break;
    default:
      statusCode = '404';
      $method = 'Not Found';
      $body = $method.toLowerCase();
      break;
  }

  function validateHeader() {
    switch (true) {
      case /^student.shpp.me/.test($headers.Host):
        folderToUse = 'student';
        return true;
      case /^another.shpp.me/.test($headers.Host):
        folderToUse = 'another';
        return true;
      default:
        statusCode = '404';
        $method = 'Not Found';
        $body = $method.toLowerCase();
        return false;
    }
  }

  function validateUri() {
    if (new RegExp(`/${folderToUse}/file.txt`).test($uri) || $uri === '/') {
      try {
        $body = require("fs").readFileSync(`${folderToUse}/file.txt`, { encoding: 'utf8', flag: 'r' });
      } catch (err) {
        statusCode = '404';
        $method = 'Not Found';
        $body = $method.toLowerCase();
      }
    } else {
      statusCode = '404';
      $method = 'Not Found';
      $body = $method.toLowerCase();
    }
  }

  // create a headers
  $headers = `Date: ${new Date()}\nServer: Apache/2.2.14 (Win32)\nContent-Length: ${$body.toString().length}\nConnection: Closed\nContent-Type: text/html; charset=utf-8`

  outputHttpResponse(statusCode, $method, $headers, $body);
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