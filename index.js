const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
 
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
  sampleFile.mv(outputURL, function(err) {
    if (err)
      return res.status(500).send(err);
    res.send(outputURL);
  });
  
})
.get('/download', function(req, res){
  res.download(outputURL, outputFileName);
});

var server = app.listen(8000, function(){
  console.log('Server listening on port 8000');
});