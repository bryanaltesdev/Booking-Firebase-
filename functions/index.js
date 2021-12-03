const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const resourceCalendar = require('./Routes/resourceCalendar');
const resource = require('./Routes/resource');
const typeOfResource = require('./Routes/typeOfResource');
const place = require('./Routes/place');
const reservation = require('./Routes/reservation');
const user = require('./Routes/user');

app.use(cors());
// server.js or app.js
app.use(bodyParser.json());
app.use('/resourceCalendar', function (req, res, next) {
  req.admin = admin
  next();
}, resourceCalendar);
app.use('/resource', function (req, res, next) {
  req.admin = admin
  next();
}, resource);
app.use('/typeOfResource', function (req, res, next) {
  req.admin = admin
  next();
}, typeOfResource);
app.use('/place', function (req, res, next) {
  req.admin = admin
  next();
}, place);
app.use('/reservation', function (req, res, next) {
  req.admin = admin
  next();
}, reservation);
app.use('/user', function (req, res, next) {
  req.admin = admin
  next();
}, user);
exports.user= functions.https.onRequest(app);