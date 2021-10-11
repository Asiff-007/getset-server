'use strict';

var sys_config = require('../resources/sys_config');

module.exports = {
  index: function (req, resp) {
    var rules = {
      campaign_id: {type: 'int', required: true}
    };

    if (req.validate(null, null, rules)) {
      var frame_data = sys_config.game_data
        .get(req.query.campaign_id).selfie_frame_data;

      if (!frame_data) {
        resp.sendStatus(404);
        return;
      }

      resp.render(process.cwd() +
        '/games/views/winnerSelfie.html', {
          selfie_frame: frame_data.frame_path,
          height: frame_data.data.height,
          width: frame_data.data.width,
          offset_x: frame_data.data.offset_x,
          offset_y: frame_data.data.offset_y,
          inner_width: frame_data.data.inner_width,
          inner_height: frame_data.data.inner_height
        });
    }
  }
};
