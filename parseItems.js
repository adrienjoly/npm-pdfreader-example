const { PdfReader } = require('pdfreader');

new PdfReader().parseFileItems('CV_ErhanYasar.pdf', function(err, item){
  if (err)
    console.error(err);
  else if (!item)
    console.error('null item');
  else if (item.text)
    console.log(item.text);
});
