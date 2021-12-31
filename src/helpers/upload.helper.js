const GridFsBucket = require('mongodb').GridFSBucket;
const MongoClient = require('mongodb').MongoClient;

const config = require('../config');

const mongoClient = new MongoClient(config.mongoUri);

const filesCollection = async () => {
  await mongoClient.connect();
  const database = mongoClient.db(config.databaseName);
  return database.collection(config.fileBucket + '.files');
};

const fileBucket = async () => {
  await mongoClient.connect();
  const database = mongoClient.db(config.databaseName);
  const bucket = new GridFsBucket(database, { bucketName: config.fileBucket });
  return bucket;
};

module.exports = { filesCollection, fileBucket };
