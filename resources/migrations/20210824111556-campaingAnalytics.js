exports.up = function (db, callback) {
  'use strict';

  db.addColumn('campaign', 'total_prices', {
    type: 'int',
    unsigned: true
  }, function () {
    db.addColumn('campaign', 'claimed_prices', {
      type: 'int',
      unsigned: true
    }, function () {
      db.addColumn('campaign', 'total_players', {
        type: 'int',
        unsigned: true
      }, callback);
    });
  });
};

exports.down = function (db, callback) {
  'use strict';

  db.removeColumn('campaign', 'total_prices', function () {
    db.removeColumn('campaign', 'claimed_prices', function () {
      db.removeColumn('campaign', 'total_players', callback);
    });
  });
};
