const Models = require('../models');
const helpers = require('./helpers');
const Offer = Models.Offer;
const Category = Models.Category;

const createOffer = async (req, res) => {
  try {
    if(req.body.categories){
      try {
        req.body.categories = await Offer.checkIfCategoriesExists(req.body.categories);
      } catch (error) {
        console.log(error); 
        return res.send({error: 'Internal server error'}).status(500)
      }
    }
    let by = req.currentUser.profile;
    const offerData = { ...req.body, by };
    let offerToCreate = new Offer(offerData);
    offerToCreate.user = req.currentUser._id;
    if (req.body.images) {
      offerToCreate.images = [];
      req.body.images.map(imageToSave => {
        offerToCreate.images.push(helpers.saveImageFromBase64(imageToSave, 'offers', Math.random() + req.body.name));
      });
    }
    if (req.files) {
      req.files.map(fileToSaveInDocument => {
        if (!offerToCreate.images) {
          offerToCreate.images = [];
        }
        offerToCreate.images.push(fileToSaveInDocument.path.replace('public', ''));
      });
    }
    await offerToCreate.save();
    return res.send(offerToCreate);
  } catch (error) {
    if (error.name == 'ValidationError') {
      return helpers.showMongooseErrors(res, error);
    } else {
      console.log(error);
      return res.send({ ok: false });
    }
  }
};


const getByParent = async (req, res) => {
  try {
    const parentCategories = await Category.find({parent: req.params.parent});
    return res.send(parentCategories);
  } catch (error) {
    console.log(error);
    res.send({msg: 'Internal Server Error'}).status(500);
  }
}

const getOffersByCategory = async (req, res) => {
  try {
    console.log(req.params.category)
    const offersByCategory = await Offer.find({categories: req.params.category}).populate('categories', 'name').populate('by', 'name image');
    return res.send(offersByCategory);
  } catch (error) {
    console.log(error);
    return res.send(error)
  }
}
module.exports = {
  createOffer,
  getByParent,
  getOffersByCategory
};
