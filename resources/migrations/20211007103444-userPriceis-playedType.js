exports.up = function (db, callback) {
  'use strict';

  db.addColumn('user_price', 'played', {
    type: 'boolean',
    defaultValue: 0
  }, callback);
};

exports.down = function (db, callback) {
  'use strict';

  db.removeColumn('user_price', 'played', callback);
};
