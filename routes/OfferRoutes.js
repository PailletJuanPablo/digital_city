const express = require('express');

const offerController = require('../controllers/offerController');
const tokenMiddleware = require('../middlewares/checkToken');
const OfferRouter = express.Router();
const crudBasicOperations = require('../controllers/crudOperations');
const Models = require('../models');
const OfferModel = Models.Offer;
const Category = Models.Category;
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `./public/uploads/offers`);
  },
  filename: function(req, file, cb) {
    cb(null, new Date().getSeconds() + '-' + file.originalname.trim() );
    if(!req.imageUrls){
        req.imageUrls = []
    } 
  }
});
var upload = multer({ storage: storage });


OfferRouter.post('/', tokenMiddleware.verifyAuth, upload.array('images') , offerController.createOffer);

OfferRouter.delete('/offer/:id', tokenMiddleware.verifyAuth,  (req, res) => {
    return crudBasicOperations.deleteIfIsOwner(req, res, OfferModel, 'by')
});
OfferRouter.get('/list', (req, res ) => {
  crudBasicOperations.listAll(req, res, OfferModel)
});
OfferRouter.get('/list/services', (req, res ) => {
  crudBasicOperations.listByParam(req, res, OfferModel, 'type', 'Service')
});
OfferRouter.get('/list/products', (req, res ) => {
  crudBasicOperations.listByParam(req, res, OfferModel, 'type', 'Product')
});


OfferRouter.post('/categories/', (req, res ) => {
  crudBasicOperations.createNew(req, res, Category)
});
OfferRouter.get('/categories/', (req, res ) => {
  crudBasicOperations.listAll(req, res, Category)
});
OfferRouter.get('/list/by_category/:category', offerController.getOffersByCategory);



// Lo exportamos para usar en app.js
module.exports = OfferRouter;
