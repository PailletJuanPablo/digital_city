const jwtService = require('../services/jsonwebtoken');
const User = require('../models/User');
//guard
const verifyAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.send({ error: 'No permission' });
  }
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const tokenDecoded = jwtService.decodeToken(token);
    const userData = await User.findById(tokenDecoded.data._id).populate('profile');
    if(userData){
      req.currentUser = userData;
      return next();
    }else{
      return res.send({ error: 'No permisssion' }).status(500);
    }
  } catch (error) {
    return res.send({ error: 'No permisssion' }).status(500);
  }
};

const optionalToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return next();
  }
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const tokenDecoded = jwtService.decodeToken(token);
    req.currentUser = tokenDecoded.data;
    return next();
  } catch (error) {
    return res.send({ error: 'Malformed Token' }).status(500);
  }
};


module.exports = {
  verifyAuth,
  optionalToken,
};
