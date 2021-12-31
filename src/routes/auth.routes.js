const { Router } = require('express');

const { requireAuth } = require('../middlewares/auth.middleware');
const authCtrl = require('../controllers/auth.controller');

const router = Router();

router.post('/login', authCtrl.login);

router.get('/me', requireAuth, authCtrl.currentUser);

module.exports = router;
