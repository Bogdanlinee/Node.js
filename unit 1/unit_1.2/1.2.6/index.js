// const express = require('express');
// const app = express();
// const port = 3000;
// let a = 0;

// app.get('/', (req, res) => {
//   res.send(a.toString());
//   a++;
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');


app.get('/', (req, res) => {
  let counetResult = fs.readFileSync('counter.txt', 'utf-8');
  res.send(counetResult);
  counetResult = (parseInt(counetResult) + 1).toString();
  fs.writeFileSync('counter.txt', counetResult, 'utf-8');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});