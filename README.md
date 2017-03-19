# Example of use of [pdfreader](https://github.com/adrienjoly/npm-pdfreader)

![example cv resume parse convert pdf to text](example.png)

Here is the code required to convert this PDF file into text:

```js
var pdfreader = require('pdfreader');

var rows = {}; // indexed by y-position

function printRows() {
  Object.keys(rows) // => array of y-positions (type: float)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
    .forEach((y) => console.log((rows[y] || []).join('')));
}

new pdfreader.PdfReader().parseFileItems('CV_ErhanYasar.pdf', function(err, item){
  if (!item || item.page) {
    // end of file, or page
    printRows();
    console.log('PAGE:', item.page);
    rows = {}; // clear rows for next page
  }
  else if (item.text) {
    // accumulate text items into rows object, per line
    (rows[item.y] = rows[item.y] || []).push(item.text);
  }
});
```
