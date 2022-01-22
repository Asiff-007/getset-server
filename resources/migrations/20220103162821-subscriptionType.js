exports.up = function (db, callback) {
  'use strict';

  db.addColumn('subscription', 'type', {
    type: 'string',
    length: 20
  }, callback);
};

exports.down = function (db, callback) {
  'use strict';

  db.removeColumn('subscription', 'type', callback);
};
