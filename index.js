const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ 
    limit: '100mb',
    extended: true,
    parameterLimit: 1000000 
}));

app.use(bodyParser.json());
var path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

require('dotenv').config();

const router = require('./routes');
app.use(router);
app.disable('x-powered-by');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE');
  res.header('Allow', 'GET, POST, PUT,DELETE');
  next();
});

let port = process.env.APP_PORT;
let dbUrl = process.env.DB_URL;
let connection; 
const connect = async () => {
  try {
    connection = await mongoose.connect(dbUrl, { useNewUrlParser: true });
    console.log('Database Connection Done')
    await app.listen(process.env.PORT || port);
    console.log('Server Living in Port ' + port)
  } catch (error) {
    console.log(error);
  }
}
connect();

