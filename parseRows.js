var pdfreader = require('pdfreader');
pdfreader.LOG.toggle(true);

var rows = {}; // indexed by y-position

new pdfreader.PdfReader().parseFileItems('CV_ErhanYasar.pdf', function(err, item){
  if (err)
    console.error(err);
  else if (!item) {
    // end of parsing
    for (var rowN in rows) {
      console.log(rows[rowN].join(''))
    }
  }
  else if (item.text) {
    // accumulate text items into rows object, per line
    (rows[item.y] = rows[item.y] || []).push(item.text);
  }
});
