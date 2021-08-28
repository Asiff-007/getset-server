exports.up = function (db, callback) {
  'use strict';

  db.renameColumn('price', 'type', 'image', callback);
};

exports.down = function (db, callback) {
  'use strict';

  db.renameColumn('price', 'image', 'type', callback);
};
