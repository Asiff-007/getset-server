exports.up = function (db, callback) {
  'use strict';

  db.changeColumn('user', 'id',
  {type: 'int', autoIncrement: true}, callback);
};

exports.down = function (db, callback) {
  'use strict';

  db.changeColumn('user', 'id',
  {type: 'int', autoIncrement: false}, callback);
};
