const merge = require('lodash/merge');
const formidable = require('formidable');
const User = require('../models/user.model');
const { formatError } = require('../helpers/error.helper');
const { uploadSingleFile } = require('../middlewares/upload.middleware');
const config = require('../config');
const { removeFile } = require('../helpers/upload.helper');
const debug = require('debug')('simple-social-server:user-controller');

module.exports.getUsers = async (req, res) => {
  try {
    let users = await User.find().select('name email updatedAt createdAt photo');

    res.json(users);
  } catch (err) {
    res.status(400).json(formatError(err));
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json(formatError(err));
  }
};

module.exports.getUserById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        error: 'User not found',
      });
    req.profile = user;
    next();
  } catch (err) {
    next(err);
  }
};

const updatedUserData = (user, data) => {
  delete data._id;
  delete data.hashedPassword;
  delete data.salt;
  delete data.photo;

  if (data.email && data.email.trim() === user.email) delete data.email;

  return merge(user, data);
};

module.exports.updateUser = async (req, res) => {
  let user = req.profile;

  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      user = updatedUserData(user, fields);
    });

    await uploadSingleFile(req, res);

    if (req.file) {
      await removeFile(req.profile.photo);
      user.photo = req.file.filename;
    } else {
      user = updatedUserData(user, req.body);
    }

    let updatedUser = await user.save();
    return res.json(updatedUser);
  } catch (err) {
    res.status(400).json(formatError(err));
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    await removeFile(req.profile.photo);
    await req.profile.remove();
    res.status(204).json();
  } catch (err) {
    res.status(400).json(formatError(err));
  }
};
