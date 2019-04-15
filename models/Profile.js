let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User = require('./User');
const Activity = require('./Activity');

let ProfileSchema = Schema({
  type: {
    type: String,
    required: true,
    enum: ['Person', 'Company']
  },
  name: { type: String, required: true },
  surname: { type: String },
  bio: { type: String },
  age: Number,
  image: String,
  address: String,
  cuit: Number,
  locationDetails: {
    lat: String,
    lng: String,
    country: String,
    city: String,
    street: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Offer',
    autopopulate: true
  }],
  services: [{
    type: Schema.Types.ObjectId,
    ref: 'Offer',
    autopopulate: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

ProfileSchema.plugin(require('mongoose-autopopulate'));

ProfileSchema.post('save', async function(doc, next) {
  try {
    const user = await User.findById(doc.user);
    user.profile = doc._id;
    await user.save();
    await Activity.create({
      user: user._id,
      entity: doc._id,
      entityType: 'Profile',
      activity: 'Create Profile',
      points: 10
    });
    next();
  } catch (error) {console.log(error)}
  next();
});



/*
ProfileSchema.virtual('products', async function() {
  return this
});
*/


ProfileSchema.set('toJSON', { getters: true, virtuals: true });




// assign a function to the "methods" object of our animalSchema
ProfileSchema.methods.getUserWithData = async function(cb) {
  try {
    const userWithData = await User.findById(this.user).populate('profile');
    return userWithData;
  } catch (error) {
    console.log('error', error);
    return error;
  }
};

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
