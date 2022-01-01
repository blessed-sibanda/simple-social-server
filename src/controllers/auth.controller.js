const User = require('../models/user.model');
const { createJwt } = require('../helpers/auth.helper');

module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.authenticate(req.body.password))
    return res.json({ accessToken: await createJwt(user) });
  else
    return res.status(401).json({
      message: 'Invalid email/password',
    });
};

module.exports.currentUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.auth.sub);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
