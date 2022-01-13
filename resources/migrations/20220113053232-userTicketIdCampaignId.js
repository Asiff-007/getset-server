exports.up = function (db, callback) {
  'use strict';

  db.addColumn('user', 'campaign_id', {
    type: 'int',
    unsigned: true
  }, function () {
    db.addColumn('user', 'ticket_id', {
      type: 'string',
      length: 20
    }, callback);
  });
};

exports.down = function (db, callback) {
  'use strict';

  db.removeColumn('user', 'campaign_id', function () {
    db.removeColumn('user', 'ticket_id', callback);
  });
};
