exports.up = function (db, callback) {
  'use strict';

  db.addColumn('shop', 'corporate_id', {
    type: 'int',
    unsigned: true
  }, callback);
};

exports.down = function (db, callback) {
  'use strict';

  db.removeColumn('shop', 'corporate_id', callback);
};
