exports.up = function (db, callback) {
  'use strict';

  db.renameColumn('user_price', 'status', 'claim_status', callback);
};

exports.down = function (db, callback) {
  'use strict';

  db.renameColumn('user_price', 'claim_status', 'status', callback);
};
