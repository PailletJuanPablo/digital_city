var jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.ENCODE_KEY;

const encodeData = data => {
  const encodedData = jwt.sign({ data }, secretKey, {noTimestamp: false});
  return encodedData;
};

const decodeToken = token => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return error;
  }
};

module.exports = {
  encodeData,
  decodeToken
}