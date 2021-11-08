exports.up = function (db, callback) {
  'use strict';

  db.addColumn('campaign', 'coupen', {
    type: 'boolean',
    defaultValue: 0
  }, callback);
};

exports.down = function (db, callback) {
  'use strict';

  db.removeColumn('campaign', 'coupen', callback);
};
