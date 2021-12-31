const { Router } = require('express');
const merge = require('lodash/merge');

const { requireAuth, isProfileOwner } = require('../middlewares/auth.middleware');
const userCtrl = require('../controllers/user.controller');

const router = Router();

router.get('/', userCtrl.getUsers);

router.post('/', userCtrl.createUser);

router.param('userId', userCtrl.getUserById);

router.get('/:userId', requireAuth, async (req, res) => {
  res.json(req.profile);
});

router.put('/:userId', requireAuth, isProfileOwner, userCtrl.updateUser);

router.delete('/:userId', requireAuth, isProfileOwner, userCtrl.deleteUser);

module.exports = router;
