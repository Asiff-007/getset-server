'use strict';

exports.up = function(db) {
  return db.createTable('game', {
    id:{type: 'int', primaryKey: true, autoIncrement: true},
    name:{type: 'string', length: 40},
  });
};

exports.down = function(db) {
  return db.dropTable('game');
};