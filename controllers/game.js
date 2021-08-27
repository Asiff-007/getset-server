'use strict';

module.exports = {
  index: function (req, resp) {
    // TODO price get logic
    resp.render(process.cwd() +
      '/games/wrapper/misteryBox.html', {peep: 'ABCD Supermarket'});
  }
};
