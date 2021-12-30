const { Router } = require('express');

const { formatError } = require('../helpers/error.helper');
const { requireAuth, isProfileOwner } = require('../services/auth.service');
const { userById, updateUser } = require('../services/user.service');
const User = require('../models/user.model');

const router = Router();

router.get('/', async (req, res) => {
  try {
    let users = await User.find().select('name email updatedAt createdAt');
    res.json(users);
  } catch (err) {
    res.status(400).json(formatError(err));
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json(formatError(err));
  }
});

router.param('userId', userById);

router.get('/:userId', requireAuth, async (req, res) => {
  res.json(req.profile);
});

router.put('/:userId', requireAuth, isProfileOwner, async (req, res) => {
  try {
    let updatedUser = await updateUser(req);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json(formatError(err));
  }
});

router.delete('/:userId', requireAuth, isProfileOwner, async (req, res) => {
  try {
    await req.profile.remove();
    res.status(204).json();
  } catch (err) {
    res.status(400).json(formatError(err));
  }
});

module.exports = router;
