const express = require('express');
const app = new express();

const port = 8000;

app.use(express.static('dist'));

app.listen(port, 'localhost', () => {
  console.log('Server is running on port: ', port);
});
