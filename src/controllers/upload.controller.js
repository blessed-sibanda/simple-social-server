const MongoClient = require('mongodb').MongoClient;
const GridFsBucket = require('mongodb').GridFSBucket;

const { uploadSingleFile } = require('../middlewares/upload.middleware');
const config = require('../config');
const { formatError } = require('../helpers/error.helper');

const mongoClient = new MongoClient(config.mongoUri);

module.exports.uploadFile = async (req, res) => {
  try {
    await uploadSingleFile(req, res);
    if (req.file === undefined)
      return res.status(422).json({ message: 'You must select a file' });
    else return res.json({ message: 'File has been been uploaded' });
  } catch (err) {
    console.log(err);
    return res.json(`Error when trying upload image: ${error}`);
  }
};

module.exports.getFiles = async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db(config.databaseName);
    const images = database.collection(config.fileBucket + '.files');

    const cursor = images.find({});

    if ((await cursor.count()) === 0) {
      return res.status(404).json({ message: 'No files found!' });
    }

    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
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
    await mongoClient.connect();
    const database = mongoClient.db(config.databaseName);
    const bucket = new GridFsBucket(database, { bucketName: config.fileBucket });
    let downloadStream = bucket.openDownloadStreamByName(req.params.name);
    downloadStream.on('data', (data) => res.write(data));
    downloadStream.on('error', (err) =>
      res.status(404).json({ message: `Cannot download the file!: ${err.message}` }),
    );
    downloadStream.on('end', () => res.end());
  } catch (err) {
    return res.status(500).json(formatError(err));
  }
};
