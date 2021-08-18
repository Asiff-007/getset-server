exports.up = function (db, callback) {
  'use strict';

  db.changeColumn('admin', 'id', {type: 'int', autoIncrement: true},
    function () {
      db.changeColumn('admin', 'user_name',
        {type: 'string', length: 20, primaryKey: true}, function () {
          db.changeColumn('shop', 'id',
            {type: 'int', autoIncrement: true}, callback);
        });
    });
};

exports.down = function (db, callback) {
  'use strict';

  db.changeColumn('admin', 'id', {type: 'int', autoIncrement: false},
    function () {
      db.changeColumn('admin', 'user_name',
        {type: 'string', length: 20, primaryKey: false}, function () {
          db.changeColumn('shop', 'id',
            {type: 'int', autoIncrement: false}, callback);
        });
    });
};
