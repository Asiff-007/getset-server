'use strict';

exports.up = function(db) {
  return db.createTable('price', {
    id:{type: 'int', primaryKey: true, autoIncrement: true},
    campaign_id:{type: 'int'},
    name: {type: 'string', length: 45},
    type:{type:'string'},
    count:{type:'int'},
    expiry:{type: 'datetime'},
    status:{type: 'string', length: 10}
  });
};

exports.down = function(db) {
  return db.dropTable('price');
};
