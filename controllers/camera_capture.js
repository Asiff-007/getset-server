'use strict';

//var game = require('../models/game');

module.exports = {
  index: function (req, resp) {
    var rules = {
      campaign_id: {type: 'int', required: true}
    };

    var snapshot_map = new Map();

    snapshot_map.set(2, {
      frame_path: '../assets/popees_frame.png',
      data: {
        height: 1920,
        width: 1080,
        offset_x: 162,
        offset_y: 594,
        inner_width: 732,
        inner_height: 1058
      }
    });

    console.log(req.query);
    if (req.validate(null, null, rules)) {
      resp.render(process.cwd() +
        '/games/views/winnerSelfie.html', {
          selfie_frame: snapshot_map.get(req.query.campaign_id).frame_path,
          height: snapshot_map.get(req.query.campaign_id).data.height,
          width: snapshot_map.get(req.query.campaign_id).data.width,
          offset_x: snapshot_map.get(req.query.campaign_id).data.offset_x,
          offset_y: snapshot_map.get(req.query.campaign_id).data.offset_y,
          inner_width: snapshot_map.get(req.query.campaign_id).data.inner_width,
          inner_height: snapshot_map.get(req.query.campaign_id).data.inner_height
        });
    }
  }
};
