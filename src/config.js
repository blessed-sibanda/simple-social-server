const databaseName = 'simple-social-server';
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

module.exports = {
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' +
      (process.env.IP || 'localhost') +
      ':' +
      (process.env.MONGO_PORT || '27017') +
      '/' +
      databaseName,
  jwtSecret: process.env.JWT_SECRET || 'my-secret',
  fileBucket: 'files',
  databaseName,
  baseUrl,
  filesUrl: baseUrl + '/api/upload/files/',
};
