'use strict';

//var game = require('../models/game');

module.exports = {
  index: function (req, resp) {
    var rules = {
      campaign_id: {type: 'int', required: true}
    };

    var snapshot_map = new Map();

    snapshot_map.set(2, '/games/views/luckySlingShot.html');

    console.log(req.query);
    if (req.validate(null, null, rules)) {
      resp.render(process.cwd() +
        '/games/views/winnerSelfie.html', {selfie_frame: snapshot_map.get(req.query.campaign_id)});
    }
  }
};
