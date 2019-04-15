// Imports
const User = require('../models/index').User;
const tokenService = require('../services/jsonwebtoken');
const bcrypt = require('bcrypt');
const helpers = require('./helpers');
const Profile = require('../models').Profile;
// const emitter = require('../services/events');

// Global Scope
const saltRounds = 10;
/*
emitter.on('searched', (data) => {
  console.log('Searched by category', data)
})*/
const signUp = async (req, res) => {
  try {
    const userRegistered = new User(req.body);
    userRegistered.password = bcrypt.hashSync(userRegistered.password, saltRounds);
    const token = tokenService.encodeData(userRegistered);
    const profile = new Profile(req.body);
    if (req.body.image) {
      profile.image = helpers.saveImageFromBase64(req.body.image, 'profiles', parseInt((Math.random() * 100), 10) + userRegistered._id);
    }
  
    await userRegistered.save();
    profile.user = userRegistered._id;
    await profile.save();
    userRegistered.profile = profile._id;
    await profile.save();
    await userRegistered.save();
    return res.send({
      user: userRegistered,
      token,
      profile
    });
  } catch (error) {
    if (error.name == 'ValidationError') {
      return helpers.showMongooseErrors(res, error)
    } else {
      console.log(error);
      return res.send({ ok: false });
    }
  }
};

const getuserData = async (req, res) => {


  return res.send(req.currentUser);
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.send({ message: 'missing fields' }).status(400);
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({ msg: 'User not exists' });
    }
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
      return res.send({ msg: 'Invalid password' });
    }
    const token = tokenService.encodeData(user);
    return res.send({ user, token });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

module.exports = {
  signUp,
  getuserData,
  login
};
