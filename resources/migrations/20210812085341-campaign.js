'use strict';

exports.up = function(db) {
  return db.createTable('campaign', {
    id:{type: 'int', primaryKey: true},
    shop_id:{type: 'int'},
    campaign_name: {type: 'string', length: 45},
    from:{type:'date'},
    to:{type:'date'},
    admin_id:{type: 'int'},
    status:{type: 'string', length: 10}
  });
};

exports.down = function(db) {
  return db.dropTable('campaign');
};
