exports.up = function (db, callback) {
  'use strict';

  db.addColumn('price', 'given', {
    type: 'int',
    unsigned: true,
    defaultValue: 0
  }, callback);
};

exports.down = function (db, callback) {
  'use strict';

  db.removeColumn('price', 'given', callback);
};
