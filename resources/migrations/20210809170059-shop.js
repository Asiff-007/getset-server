'use strict';

exports.up = function(db) {
  return db.createTable('shop', {
    id:{type: 'int', primaryKey: true},
    name:{type: 'string', length: 40},
    address: {type: 'string', length: 80},
    logo:{type:'string', length:80},
    status: {type: 'string', length:10}
  });
};

exports.down = function(db) {
  return db.dropTable('shop');
};