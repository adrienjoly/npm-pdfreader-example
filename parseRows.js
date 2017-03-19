var pdfreader = require('pdfreader');
//pdfreader.LOG.toggle(true); // uncomment this to get DEBUG logs

var rows = {}; // indexed by y-position

function printRow(y) {
  console.log((rows[y] || []).join(''));
}

function printRows() {
  Object.keys(rows) // => array of y-positions (type: float)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
    .forEach(printRow);
}

new pdfreader.PdfReader().parseFileItems('CV_ErhanYasar.pdf', function(err, item){
  if (err)
    console.error(err);
  else if (!item || item.page) {
    // end of file, or page
    printRows();
    console.log('\n  -- PAGE', item.page, '-- \n');
    rows = {}; // clear rows for next page
  }
  else if (item.text) {
    // accumulate text items into rows object, per line
    (rows[item.y] = rows[item.y] || []).push(item.text);
  }
});
