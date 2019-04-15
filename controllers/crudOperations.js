const helpers = require('./helpers');

const listAll = async (req, res, Model) => {
  try {
    const results = await Model.find();
    return res.send(results);
  } catch (error) {
    if (error.name == 'ValidationError') {
      return helpers.showMongooseErrors(res, error);
    } else {
      console.log(error);
      return res.send({ error });
    }
  }
};

const listByParam = async (req, res, Model, paramToFind, value) => {
  try {
    let search = {};
    search[paramToFind] = value;
    console.log(search);
    const results = await Model.find(search);
    return res.send(results);
  } catch (error) {
    if (error.name == 'ValidationError') {
      return helpers.showMongooseErrors(res, error);
    } else {
      console.log(error);
      return res.send({ error });
    }
  }
};


const showById = async (req, res, Model) => {
  const id = req.params.id;
  try {
    const document = await Model.findById(id);
    if (document) {
      return res.send(document);
    }
    return res.send({ error: 'Resource not found' }).status(404);
  } catch (error) {
    if (error.name == 'ValidationError') {
      return helpers.showMongooseErrors(res, error);
    } else {
      console.log(error);
      return res.send({ error });
    }
  }
};

const deleteById = async (req, res, Model) => {
  const id = req.params.id;
  try {
    const documentToRemove = await Model.findByIdAndRemove(id);
    if (documentToRemove) {
      return res.send({ deleted: true });
    }
    return res.send({ msg: 'Document not exists' });
  } catch (error) {
    if (error.name == 'ValidationError') {
      return helpers.showMongooseErrors(res, error);
    } else {
      console.log(error);
      return res.send({ error });
    }
  }
};

const deleteIfIsOwner = async (req, res, Model, parentField) => {
  const id = req.params.id;
  try {
    const documentToRemove = await Model.findById(id);
    const profile = req.currentUser.profile;
    if (documentToRemove && profile.id == documentToRemove[parentField]) {
      await Model.findByIdAndRemove(documentToRemove.id);
      return res.send({ deleted: true });
    }
    return res.send({ msg: 'Document not exists' });
  } catch (error) {
    if (error.name == 'ValidationError') {
      return helpers.showMongooseErrors(res, error);
    } else {
      console.log(error);
      return res.send({ error });
    }
  }
};

const createNew = async (req, res, Model) => {
  console.log(req.body)
  try {
    const documentCreated = await Model.create(req.body);
    return res.send(documentCreated);
  } catch (error) {
    if (error.name == 'ValidationError') {
      return helpers.showMongooseErrors(res, error);
    } else {
      console.log(error);
      return res.send({ error });
    }
  }
};

module.exports = {
  listAll,
  showById,
  deleteById,
  createNew,
  deleteIfIsOwner,
  listByParam
};
