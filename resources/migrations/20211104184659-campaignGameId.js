exports.up = function (db, callback) {
  'use strict';

  db.addColumn('campaign', 'game_id', {
    type: 'int',
    unsigned: true
  }, callback);
};

exports.down = function (db, callback) {
  'use strict';

  db.removeColumn('campaign', 'game_id', callback);
};
