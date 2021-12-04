exports.up = function (db, callback) {
  'use strict';

  db.addColumn('user_price', 'campaign_id', {
    type: 'int',
    unsigned: true
  }, callback);
};

exports.down = function (db, callback) {
  'use strict';

  db.removeColumn('user_price', 'campaign_id', callback);
};
