exports.up = function (db, callback) {
  'use strict';

  db.changeColumn('user_price', 'ticket_id', {
    type: 'string',
    length: 20
  }, callback);
};

exports.down = function (db, callback) {
  'use strict';

  db.changeColumn('user_price', 'ticket_id', {
    type: 'int',
    unsigned: true
  }, callback);
};