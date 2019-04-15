const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: { type: String, required: true },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: { type: String, required: true, select: false },
  confirmed: { type: Boolean, default: false },
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

UserSchema.plugin(require('mongoose-autopopulate'));

UserSchema.statics.getUserWithData = async function(userData, callback) {
  try {
    const user = await this.findById(userData._id).populate('profile');
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

UserSchema.statics.getProfileById = async function(userId) {
  const userWithProfile = await this.findById(userId).populate('profile');
  return userWithProfile.profile;
};

UserSchema.statics.getProfileWithProductsAndServices = async function(id) {
  const populated = await this.findById(id).populate([
    {
      path: 'profile',
      populate: [
        {
          path: 'products',
          model: 'Product',
        }
      ]
    },
    {
      path: 'profile',
      populate: [
        {
          path: 'services',
          model: 'Service', 
        }
      ]
    }
  ]);
  return populated;
};

UserSchema.set('toJSON', { getters: true, virtuals: true });

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
