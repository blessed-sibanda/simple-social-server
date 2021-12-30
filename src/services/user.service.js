const merge = require('lodash/merge');

const User = require('../models/user.model');

const userById = async (req, res, next, id) => {
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

const updateUser = async (req) => {
  delete req.body._id;
  delete req.body.hashedPassword;
  delete req.body.salt;

  if (req.body.email && req.body.email.trim() === req.profile.email)
    delete req.body.email;

  let user = merge(req.profile, req.body);
  return await user.save();
};

module.exports = { userById, updateUser };
