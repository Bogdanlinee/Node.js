// этот файл надо будет дописать...
// не обращайте на эту функцию внимания 
// она нужна для того чтобы правильно читать входные данные
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

// вот эту функцию собственно надо написать
function parseTcpStringAsHttpRequest(string) {
  let arr = string.split('\n');
  console.log(arr);
  let methodValue = arr[0].split(' ')[0];
  let uriValue = arr[0].split(' ')[1];
  let headeValue = arr.reduce((acc, item, index) => {
    if (index > 0 && index < 7) {
      console.log(item);
      item = item.split(': ');
      if ((item[0] = item[0].trim()) === 'HOST') {
        item[0] = item[0].charAt(0) + item[0].slice(1).toLowerCase()
      }
      acc[item[0]] = item[1].trim();
    }
    return acc;
  }, {});
  let bodyValue = arr[8].trim();

  return {
    method: methodValue,
    uri: uriValue,
    headers: headeValue,
    body: bodyValue,
  };
}

http = parseTcpStringAsHttpRequest(contents);
console.log(JSON.stringify(http, undefined, 2));