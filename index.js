const express = require('express');
const app = new express();

app.use(express.static('dist'));

app.listen('8000');
