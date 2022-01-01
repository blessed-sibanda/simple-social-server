const { uploadSingleFile } = require('../middlewares/upload.middleware');
const { formatError } = require('../helpers/error.helper');
const {
  fileBucket,
  filesCollection,
  removeFile,
} = require('../helpers/upload.helper');
const config = require('../config');

module.exports.downloadFile = async (req, res) => {
  try {
    let bucket = await fileBucket();
    let downloadStream = bucket.openDownloadStreamByName(req.params.name);
    downloadStream.on('data', (data) => res.write(data));
    downloadStream.on('error', (err) =>
      res.status(404).json({ message: err.message }),
    );
    downloadStream.on('end', () => res.end());
  } catch (err) {
    return res.status(500).json(formatError(err));
  }
};

module.exports.deleteFile = async (req, res) => {
  try {
    await removeFile(req.params.name);
    res.status(204).json({});
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};
