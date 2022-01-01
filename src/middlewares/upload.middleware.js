const util = require('util');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const config = require('../config');
const UUID = require('uuidjs');
const User = require('../models/user.model');

const storage = new GridFsStorage({
  url: config.mongoUri,
  // cache: true,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: async (req, file) => {
    const filename = `${Date.now()}-${UUID.generate()}-${file.originalname}`;
    return {
      bucketName: config.fileBucket,
      filename,
    };
  },
});

const uploadSingleFile = util.promisify(multer({ storage }).single('file'));

module.exports = { uploadSingleFile };
