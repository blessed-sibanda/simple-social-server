const { Router } = require('express');

const config = require('../config');
const uploadCtrl = require('../controllers/upload.controller');

const router = Router();

router.post('/', uploadCtrl.uploadFile);

router.get('/files', uploadCtrl.getFiles);

router.get('/files/:name', uploadCtrl.downloadFile);

router.delete('/files/:name', uploadCtrl.deleteFile);

module.exports = router;