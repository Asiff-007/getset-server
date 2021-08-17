'use strict';

exports.up = function(db) {
  return db.createTable('user_price', {
    id:{type: 'int', primaryKey: true, autoIncrement: true},
    user_id:{type: 'int'},
    price_id:{type: 'int'},
    price_won_on:{type:'datetime'},
    status:{type:'string', length: 10},
    claimed_on:{type: 'datetime'}
  });
};

exports.down = function(db) {
  return db.dropTable('user_price');
};
