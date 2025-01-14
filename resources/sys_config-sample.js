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
        price_given_ratio: 2,
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
        price_given_ratio : 2,
        play_validity_in_days: 0.0833333 / 24, // 5 minutes
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
    ,
    [3,
      {
        url: '/games/views/luckySlingShotCouponBased.html',
        price_given_ratio : 2,
        play_validity_in_days: 0.0833333 / 24, // 5 minutes
        selfie_frame_data: {
          frame_path: '../assets/mayflower_frame.png',
          data: {
            height: 1920,
            width: 1024,
            offset_x: 100,
            offset_y: 72,
            inner_width: 824,
            inner_height: 1465
          }
        }
      }
    ]
  ]),

  campaign_data: new Map([
    [1,
      {
        price_given_ratio : 3 //1 - equal chance, 0 - no empty box, <1 - decrease empty box, >1 - increase empty box; 
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
