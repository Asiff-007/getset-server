'use strict';

exports.up = function(db) {
  return db.createTable('subscription', {
    id:{type: 'int', primaryKey: true, autoIncrement: true},
    shop_id:{type: 'int'},
    name: {type: 'string', length: 45},
    expiry:{type: 'datetime'},
    status:{type: 'string', length: 10}
  });
};

exports.down = function(db) {
  return db.dropTable('subscription');
};
