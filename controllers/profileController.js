const Profile = require('../models/index').Profile;
const helpers = require('./helpers');

const createProfile = async (req, res) => {
    try {
        const profile = new Profile(req.body);
        profile.user = req.currentUser._id;
        await profile.remove({user: req.currentUser._id});
        await profile.save();
        const user = profile.user;
        return res.send(profile);
    } catch (error) {
        if(error.name == 'ValidationError'){
            return helpers.showMongooseErrors(res, error)
        }else{
            console.log(error);
            return res.send({ok: false})
        }
    }
}

module.exports = {
    createProfile,
}