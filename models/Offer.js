let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const ObjectId = mongoose.Types.ObjectId;
const modelHelpers = require('./ModelHelpers');
const Category = require('./Category');
const Activity = require('./Activity');

let OfferSchema = Schema({
  name: { type: String, required: [true, 'Name required'] },
  description: { type: String, required: [true, 'Name required'] },
  price: Number,
  images: [{type: String}],
  by: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Profile'
  },
  type: {
    type: String,
    required: true,
    enum: ['Service', 'Product']
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category'
    }
  ],
  createdAt: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  },
});

OfferSchema.plugin(require('mongoose-autopopulate'));

OfferSchema.pre('save', function(next) {
  if (!this.price) {
    this.price = 0;
  }
  next();
});

OfferSchema.statics.checkIfCategoriesExists = async function(categories, callback) {
  return new Promise((resolve, reject) => {
    const newCategories = [];
    categories.map(async (category) => {
      try {
        const getByName = await Category.findOne({ name: category });
        if (getByName) {
          newCategories.push(getByName._id)
        } else if (!ObjectId.isValid(category)) {
          const newServiceType = await Category.create({ name: category });
          newCategories.push(newServiceType._id)
        } else {
          newCategories.push(category)
        }
        if(categories.length == newCategories.length){
          return resolve(newCategories)
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
   
  })
 
};

OfferSchema.post('save', async function(document, next) {
  try {
    await modelHelpers.addToParentDocument(document);
    await Activity.create({
      user: document.by._id,
      entity: document.id,
      entityType: 'Offer',
      activity: 'Created',
      points: 0
    });
    next();
  } catch (e) {
    console.log(e);
  }
});

OfferSchema.post('remove', async function(doc) {
  try {
    await modelHelpers.addToParentDocument(document);
    next();
  } catch (error) {}
  next();
});



const Offer = mongoose.model('Offer', OfferSchema);

module.exports = Offer;
