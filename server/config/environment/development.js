'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://' + ((process.env.DB_PORT_27017_TCP||'').replace('tcp://','') || 'localhost') +
        '/' + (process.env.DB_PORT_27017_NAME || 'loyo'),
  },
  seedDB: true
};
