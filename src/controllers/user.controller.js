const merge = require('lodash/merge');
const User = require('../models/user.model');
const { formatError } = require('../helpers/error.helper');
const { uploadSingleFile } = require('../middlewares/upload.middleware');
const config = require('../config');

module.exports.getUsers = async (req, res) => {
  try {
    let users = await User.find().select(
      'name email updatedAt createdAt photo photoUrl',
    );

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
    if (user.photo) req.profile.photo = config.filesUrl + user.photo;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    delete req.body._id;
    delete req.body.hashedPassword;
    delete req.body.salt;

    if (req.body.email && req.body.email.trim() === req.profile.email)
      delete req.body.email;

    let user = merge(req.profile, req.body);

    await uploadSingleFile(req, res);
    if (req.file) user.photo = req.file.filename;

    let updatedUser = await user.save();
    return res.json(updatedUser);
  } catch (err) {
    res.status(400).json(formatError(err));
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    await req.profile.remove();
    res.status(204).json();
  } catch (err) {
    res.status(400).json(formatError(err));
  }
};
