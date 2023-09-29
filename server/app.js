const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, './.env') });
}

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const db = require('./models');
const passport = require('./config/passport');
const { corsOptionsDelegate } = require('./config/cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize());
app.use(cors(corsOptionsDelegate));

app.use('/api', routes);

app.listen(port, () => {
  console.info(`App listening on http://localhost:${port}`);
});

module.exports = app;
