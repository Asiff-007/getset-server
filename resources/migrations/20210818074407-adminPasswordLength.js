exports.up = function (db, callback) {
  'use strict';

  db.changeColumn('admin', 'password', {
    type: 'string',
    length: 600
  }, callback);
};

exports.down = function (db, callback) {
  'use strict';

  db.changeColumn('admin', 'password', {
    type: 'string',
    length: 80
  }, callback);
};
