const mongoose = require('mongoose');
const debug = require('debug')('simple-social-server:db');

const connectDb = (uri) => {
  mongoose.connect(uri);
  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error('MongoDB error: ' + err.message);
    process.exit(1);
  });

  db.once('open', () => {
    console.log('MongoDB connection established');

    mongoose.set('debug', (collectionName, method, query, doc) => {
      debug(`${collectionName}.${method}`, JSON.stringify(query), doc);
    });
  });
};

module.exports = { connectDb };
