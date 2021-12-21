exports.up = function (db, callback) {
  'use strict';

  db.addColumn('corporate', 'phone_number', {
    type: 'string',
    length: 10
  }, function () {
    db.addColumn('corporate', 'report_status', {
      type: 'string',
      length: 10
    }, callback);
  });
};

exports.down = function (db, callback) {
  'use strict';

  db.removeColumn('corporate', 'phone_number', function () {
    db.removeColumn('corporate', 'report_status', callback);
  });
};
