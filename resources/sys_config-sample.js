module.exports = {
  server: {
    ip: 'localhost:3000',
    url:'https://test.getset.shop'
  },

  coupen_less: [2],

  game_data: new Map([
    [1,
      {
        url: '/games/views/misteryBox.html',
        selfie_frame_data: {
          frame_path: '../assets/popees_frame.png',
          data: {
            height: 1920,
            width: 1080,
            offset_x: 162,
            offset_y: 594,
            inner_width: 732,
            inner_height: 1058
          }
        }
      }
    ],
    [2,
      {
        url: '/games/views/luckySlingShot.html',
        selfie_frame_data: {
          frame_path: '../assets/popees_frame.png',
          data: {
            height: 1920,
            width: 1080,
            offset_x: 162,
            offset_y: 594,
            inner_width: 732,
            inner_height: 1058
          }
        }
      }
    ]
  ]),

  /* Memcache server details */
  memcache: {
    servers: ['localhost:11211'],
    lifetime: 600,
    retries: 1,
    prefix: 'retailctrlr'
  }
};
