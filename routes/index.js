const OfferRoutes = require('./OfferRoutes');
const ProfileRoutes = require('./ProfileRoutes');
const UserRoutes = require('./UserRoutes');
const express = require('express');

const app = express();

app.use('/auth', UserRoutes);
app.use('/profiles', ProfileRoutes);
app.use('/offers', OfferRoutes);

module.exports = app;