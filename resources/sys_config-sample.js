module.exports = {
  server: {
    ip: 'localhost:3000'
  },

  /* Memcache server details */
  memcache: {
    servers: ['localhost:11211'],
    lifetime: 600,
    retries: 1,
    prefix: 'retailctrlr'
  }
};
