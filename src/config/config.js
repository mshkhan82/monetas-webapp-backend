var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var secret = '*(@!9kdj20`UK';
var secretExpiresInSeconds = 60*60*5; // 5 hours

var config = {
  development: {
    db: process.env.MONGODB || 'localhost:27017/monetas',
    port: process.env.PORT || 3000,
    root: rootPath,
    secret: {
      phrase: secret,
      expiresIn: secretExpiresInSeconds
    }
  },
  staging: {
    db: process.env.MONGODB || 'dbuser:monetaspassword@ds019634.mlab.com:19634/monetas-staging',
    port: process.env.PORT || 3000,
    root: rootPath,
    secret: {
      phrase: secret,
      expiresIn: secretExpiresInSeconds
    }
  },
  production: {
    db: process.env.MONGODB || 'localhost:27017/monetas',
    port: process.env.PORT || 3000,
    root: rootPath,
    secret: {
      phrase: secret,
      expiresIn: secretExpiresInSeconds
    }
  },
};

module.exports = config[process.env.NODE_ENV || 'development'];
