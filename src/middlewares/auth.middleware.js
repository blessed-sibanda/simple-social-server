const expressJwt = require('express-jwt');

const config = require('../config');

const requireAuth = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
  algorithms: ['HS256'],
});

const isProfileOwner = async (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth.id;
  if (!authorized)
    return res.status(403).json({
      message: 'Only the profile owner is authorized to perform this action',
    });
  next();
};

module.exports = { requireAuth, isProfileOwner };
