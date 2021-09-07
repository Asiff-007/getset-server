
exports.up = function(db, callback) {
  'use strict';

  db.changeColumn('campaign', 'total_prices', {
    type: 'int',
    defaultValue: 0
  }, function () {
    db.changeColumn('campaign', 'claimed_prices', {
      type: 'int',
      defaultValue: 0
    }, function () {
      db.changeColumn('campaign', 'total_players', {
        type: 'int',
        defaultValue: 0
      }, callback);
    });
  });
};

exports.down = function(db, callback) {
  'use strict';

  db.changeColumn('campaign', 'total_prices', {
    type: 'int',
    defaultValue: null
  }, function () {
    db.changeColumn('campaign', 'claimed_prices', {
      type: 'int',
      defaultValue: null
    }, function () {
      db.changeColumn('campaign', 'total_players', {
        type: 'int',
        defaultValue: null
      }, callback);
    });
  });
};

