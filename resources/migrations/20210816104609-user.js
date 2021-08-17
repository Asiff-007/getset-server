'use strict';

exports.up = function(db) {
  return db.createTable('user', {
    id:{type: 'int', primaryKey: true},
    name:{type: 'string', length: 30},
    mobile_no: {type: 'string', length: 12},
    last_played:{type:'datetime'},
    status: {type: 'string', length: 10}
  });
};

exports.down = function(db) {
  return db.dropTable('user');
};
