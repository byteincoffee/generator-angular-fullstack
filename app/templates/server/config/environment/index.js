'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Should we data fixtures the DB?
  dataFixtures: true,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SESSION_SECRET || 'maykell-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin', 'root'],

  admin: {
    name: process.env.ADMIN_NAME || 'Admin',
    email: process.env.ADMIN_EMAIL || 'admin@admin.com',
    password: process.env.ADMIN_PASSWORD || 'admin'
  },

  mailer: {
    service: 'Gmail',
    auth: {
      user: process.env.MAILER_USER || 'admin@admin.com',
      pass: process.env.MAILER_PASS || 'admin'
    }
  },

  contact: {
    to: '',
    subject: 'Contato feito pelo site',
    body: '<p>Nome: %name%</p><p>Email: %email%</p><p>Mensagem: %message%</p>',
  },

  recaptcha: {
    clientID: process.env.RECAPTCHA_ID || 'id',
    clientSecret: process.env.RECAPTCHA_SECRET || 'secret'
  },

  aws: {
    id: process.env.AWS_ID || 'id',
    secret: process.env.AWS_SECRET || 'secret',
    s3: {
      bucket: '',
      prefixKey: 'site/'
    }
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
