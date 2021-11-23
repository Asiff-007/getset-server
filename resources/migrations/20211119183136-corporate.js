'use strict';

exports.up = function(db) {
  return db.createTable('corporate', {
    id:{type: 'int', primaryKey: true, autoIncrement: true},
    name:{type: 'string', length: 40},
    address: {type: 'string', length: 80},
    email:{type:'string', length:320},
    status: {type: 'string', length:10}
  });
};

exports.down = function(db) {
  return db.dropTable('corporate');
};