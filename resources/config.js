var sys_config = require('./sys_config'),
    db_opts = require('./database.json')[
      process.env.NODE_ENV || /* istanbul ignore next*/ 'development'],
    _ = require('lodash'),
    obj = {

      /* database */
      // no need to test for config
      db: {
        client: db_opts.driver,
        connection: _.pick(db_opts, 'host', 'port', 'user', 'password',
          'database', 'multipleStatements'),
        pool: {
          min: 2,
          max: 10
        }
      },

      /* log files */
      logger: {
        debug: '/var/log/retailController/debug.log',
        error: '/var/log/retailController/error.log'
      },

      /* Status codes for server */
      status: {
        OK: 200,
        ERROR: 500
      },

      access_control_prod: {
        origin: '',
        headers: ''
      },

      access_control_dev: {
        origin: '*',
        headers: 'Origin, X-Requested-With, Content-Type, Accept'
      },

      messages: {
        err_resp: 'Something went wrong'
      },

      cryptor: {
        key: 'buildthebestever'
      },

      price_status: {
        not_claimed: 'NotClaimed',
        claimed: 'Claimed',
        active: 'Active',
        inactive: 'Inactive',
        no_price: 'Noprize'
      },

      campaign_status: {
        active: 'Active',
        pending: 'Pending'
      },
      
      coupen_less: [2]
    };

obj = _.merge(obj, sys_config);

module.exports = obj;
