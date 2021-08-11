'use strict';

exports.up = function(db) {
  return db.createTable('admin', {
    id:{type: 'int', primaryKey: true},
    shop_id:{type: 'int', primaryKey: true},
    user_name: {type: 'string', length: 10},
    password:{type:'string', length: 80},
    status: {type: 'string', length: 10}
  });
};

exports.down = function(db) {
  return db.dropTable('admin');
};