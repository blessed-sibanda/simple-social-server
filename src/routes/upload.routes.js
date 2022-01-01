const { Router } = require('express');

const config = require('../config');
const uploadCtrl = require('../controllers/upload.controller');

const router = Router();

router.get('/files/:name', uploadCtrl.downloadFile);

router.delete('/files/:name', uploadCtrl.deleteFile);

module.exports = router;
