const util = require('util');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const config = require('../config');
const UUID = require('uuidjs');

const storage = new GridFsStorage({
  url: config.mongoUri,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      bucketName: config.fileBucket,
      filename: `${Date.now()}-${UUID.generate()}-${file.originalname}`,
    };
  },
});

const uploadSingleFile = util.promisify(multer({ storage }).single('file'));

module.exports = { uploadSingleFile };
