'use strict';

exports.up = function(db) {
  return db.createTable('enquiry', {
    id:{type: 'int', primaryKey: true, autoIncrement: true},
    name: {type: 'string', length: 20},
    contact_number:{type:'string', length: 15}
  });
};

exports.down = function(db) {
  return db.dropTable('enquiry');
};
