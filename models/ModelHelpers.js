const addToParentDocument = async function(document) {
  const Profile = require('./Profile');
  collectionToAdd = await Profile.findById(document.by);
  switch (document.type) {
    case 'Product':
      if (!collectionToAdd.products) {
        collectionToAdd.products = [];
      }
      collectionToAdd.products.push(document._id);
      break;
    case 'Service':
      if (!collectionToAdd.services) {
        collectionToAdd.services = [];
      }
      collectionToAdd.services.push(document._id);
      break;
  }
  await collectionToAdd.save();
};

const removeFromParent = async function(document) {
  const Profile = require('./Profile');
  collectionToAdd = await Profile.findById(document.by);
  switch (document.type) {
    case 'Product':
      collectionToAdd.products = collectionToAdd.products.filter(product => {
        return product.id != document._id;
      });
      break;
    case 'Service':
      if (!collectionToAdd.services) {
        collectionToAdd.services = [];
      }
      collectionToAdd.services = collectionToAdd.services.filter(service => {
        return service.id != document._id;
      });
      break;
  }
  await collectionToAdd.save();
};

module.exports = {
  addToParentDocument,
  removeFromParent
};
