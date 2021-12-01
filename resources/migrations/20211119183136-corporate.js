'use strict';

exports.up = function(db, callback) {
  return db.createTable('corporate', {
    id:{type: 'int', primaryKey: true, autoIncrement: true},
    name:{type: 'string', length: 40},
    address: {type: 'string', length: 80},
    email:{type:'string', length:320},
    status: {type: 'string', length:10}
  },
    function () {
      db.addColumn('shop', 'corporate_id',
        {type: 'int', unsigned: true}, callback);
    });
};

exports.down = function(db, callback) {
  return db.dropTable('corporate',
    function () {
      db.removeColumn('shop', 'corporate_id', callback);
    });
};
