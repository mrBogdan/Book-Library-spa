const express = require('express');
const history = require('connect-history-api-fallback');
const app = new express();

const port = 8000;

app.use(express.static('dist'));
app.use(history());

app.listen(port, 'localhost', () => {
  console.log('Server is running on port: ', port);
});
