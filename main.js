const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.cookie('3pcookie-legacy', 'value', { secure: true });
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
var port = process.env.PORT || 3000; // 1
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});