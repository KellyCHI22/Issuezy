const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
}

const express = require('express');
const routes = require('./routes');
const db = require('./models');

const app = express();
const port = process.env.PORT || 3000;

app.use(routes);

app.listen(port, () => {
  console.info(`App listening on http://localhost:${port}`);
});

module.exports = app;
