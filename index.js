const pdf_conversion = require("phantom-html-to-pdf")({
  phantomPath: require("phantomjs-prebuilt").path
});
const fs = require('fs');

console.log('Read html...');
const htmlContent = fs.readFileSync(__dirname + '/index.html', 'utf8');

let writeStream = fs.createWriteStream(__dirname + '/index.pdf');

pdf_conversion({
  html: htmlContent,
  fitToPage: false,
  allowLocalFilesAccess: true,
  paperSize: {
    //orientation: 'landscape',
    margin: {"top": "0px", "left": "0px", "right": "0px", "bottom": "0px"}
  }
}, function (err, pdf) {
  console.log('Start conversion...');
  
  pdf.stream.pipe(writeStream);
  
  pdf.stream.on('end', function () {
    console.log('Finish!');
    
    pdf.stream.close();  // close() is async, call cb after close completes.
    writeStream.end();
    process.exit();
  });
});
