const express = require('express');
const Models = require('../models');
const Activity = Models.Activity;
const Profile = Models.Profile;

const profileController = require('../controllers/profileController');
const checkToken = require('../middlewares/checkToken').verifyAuth;
const ProfileRouter = express.Router();
const crudBasicOperations = require('../controllers/crudOperations');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `./public/uploads/${req.currentUser._id}/offers`);
  },
});


ProfileRouter.post('/', checkToken, profileController.createProfile);
ProfileRouter.get('/activities', (req, res ) => {
  crudBasicOperations.listAll(req, res, Activity)
});
ProfileRouter.delete('/activities/:id', (req, res) => {
  return crudBasicOperations.deleteById(req, res, Activity)
});
ProfileRouter.get('/companies', (req, res ) => {
  crudBasicOperations.listByParam(req, res, Profile, 'type', 'Company')
});
ProfileRouter.get('/persons', (req, res ) => {
  crudBasicOperations.listByParam(req, res, Profile, 'type', 'Person')
});
ProfileRouter.get('/show/:id', (req, res ) => {
  crudBasicOperations.showById(req, res, Profile)
});



// Lo exportamos para usar en app.js
module.exports = ProfileRouter;
