const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');

// default options
app.use(fileUpload());

const outputFileName = 'output.txt';
const outputURL = __dirname + '/' + outputFileName;
const staticURL = __dirname + '/static';
const homepage = '/html/index.html';
app.use('/static', express.static(staticURL))
.get('/', (req, res) => {
    // console.log('fetched homepage from ', staticURL);
    res.sendFile(staticURL + homepage);
})
.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  let sampleFile = req.files.file;
  // console.log('sampleFile:', req.files);

  let outputCode = convertToReadable(sampleFile.data);
  fs.writeFile(outputURL, outputCode, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The input was converted & file was saved at " + outputURL);
    res.send(outputURL);
  }); 
/*
  sampleFile.mv(outputURL, function(err) {
    if (err)
      return res.status(500).send(err);
    res.send(outputURL);
  });
  */
})
.get('/download', function(req, res){
  res.download(outputURL, outputFileName);
});


var server = app.listen(process.env.PORT || 4000, function(){
  console.log('Server listening on port 4000');
});



function convertToReadable (data) {
  let contentStr = data.toString('utf-8');
  let dict = [
    [' _ ', '| |', '|_|'],
    ['   ', '  |', '  |'],
    [' _ ', ' _|', '|_ '],
    [' _ ', ' _|', ' _|'],
    ['   ', '|_|', '  |'],
    [' _ ', '|_ ', ' _|'],
    [' _ ', '|_ ', '|_|'],
    [' _ ', '  |', '  |'],
    [' _ ', '|_|', '|_|'],
    [' _ ', '|_|', ' _|']
  ];
  let codeMap = new Map();
  for (let i = 0; i < dict.length; i++) {
      codeMap.set(dict[i].join(''), i);
  }
  let getNum = function(segments) {
    return codeMap.get(segments); // returns num if matches else return undefined
  };
  let contentStrArray = [];
  if (contentStr.indexOf('\r\n') > -1) {
    contentStrArray = contentStr.split('\r\n');
  } else {
    contentStrArray = contentStr.split('\n');
  }
  var outputArray = [];
  // per line/rows
  for (let i = 0; i < contentStrArray.length; i++) {
    // console.log('i = ' + i + '-->' + contentStrArray[i]);
    let numArray = []; // 0 to 9 rows
      //for 3 rows
      for (let j = 0; j < 3; j++, i++) {//skipping every 4th row by incrementing at j==3
        //for every char/col of the 3 rows
        let m = 0; // run for 0 to 9 digits
        for (let k = 0; (contentStrArray[i] && k < contentStrArray[i].length); k += 3, m++) {
          //for collection of 3 chars in an array
          let char3 = contentStrArray[i].substring(k, k+3);
          // console.log('k->' + k + '>>>'+ char3);
          if (numArray[m]) { //skips for every first line, when js==0
            numArray[m] = (numArray[m] + char3); 
          } else {
            numArray.push([]);
            numArray[m].push( char3 );
          }
        }
      }
      // console.log('numArray-->\n',numArray);//array of 9 codes for 9-digits
      var outputNum = '';
      for (var n = 0; n < numArray.length; n++) {
        let num = getNum(numArray[n]);
        outputNum += num;
      }
      // console.log('1st num of 9 digits found ' + outputNum);
      outputArray.push(outputNum);
    }
    console.log('\nOutput-->' + outputArray.join('\n'));
    return outputArray.join('\n');
  }
