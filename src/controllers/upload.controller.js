const { uploadSingleFile } = require('../middlewares/upload.middleware');
const { formatError } = require('../helpers/error.helper');
const { fileBucket, filesCollection } = require('../helpers/upload.helper');
const config = require('../config');

module.exports.uploadFile = async (req, res) => {
  try {
    await uploadSingleFile(req, res);
    if (req.file === undefined)
      return res.status(422).json({ message: 'You must select a file' });
    else return res.json({ message: 'File has been been uploaded', file: req.file });
  } catch (err) {
    console.log(err);
    return res.json(`Error when trying upload image: ${error}`);
  }
};

module.exports.getFiles = async (req, res) => {
  try {
    let files = await filesCollection();
    const cursor = files.find({});

    if ((await cursor.count()) === 0) {
      return res.status(404).json({ message: 'No files found!' });
    }

    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        id: doc._id,
        name: doc.filename,
        url: config.baseUrl + req.baseUrl + '/files/' + doc.filename,
      });
    });
    return res.json(fileInfos);
  } catch (err) {
    return res.status(500).json(formatError(err));
  }
};

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
    let files = await filesCollection();

    await files.deleteOne({ filename: req.params.name });

    res.status(204).json({});
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};
