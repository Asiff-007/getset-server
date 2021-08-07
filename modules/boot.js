'use strict';

var path = require('path'),
  _ = require('lodash'),
  fs = require('fs'),
  glob = require('glob');

module.exports = function (parent) {
  var verbose = parent.get('env') === 'development',
    log = function () {
      if (verbose) {
        console.log.apply(console, arguments);
      }
    },
    curr_dir = process.cwd(),
    folder_exist = fs.existsSync(curr_dir + '/controllers/'),
    dir_list = [],
    ctr_paths = [],
    dir_name;

  if (folder_exist) {
    dir_name = curr_dir + '/controllers/';
    dir_list = glob.sync(dir_name + '**/*.js');
  }
  dir_list = dir_list.concat(glob.sync(__dirname + '/../controllers/**/*.js'));

  _.each(dir_list, function (file) {
    var obj, handler, method, key, url, root,
      dirname = path.dirname(file).split('/').pop(),
      ctr_path = file.split('controllers/').pop(),
      name = path.basename(file, '.js');

    if (_.indexOf(ctr_paths, ctr_path) > -1) {
      return;
    }
    ctr_paths.push(ctr_path);
    dirname = (dirname === 'controllers' ? '' : dirname);
    root = '/';
    if (name !== 'index' && dirname !== '') {
      dirname += '/:' + dirname + '_id';
      root += dirname + '/';
    }
    name = (name === 'index' ? dirname : name);
    log('  %s:', name);

    obj = require(file);
    // generate routes based
    // on the exported methods
    for (key in obj) {
      // "reserved" exports
      if (_.startsWith(key, '_') || ['before'].indexOf(key) !== -1) {
        continue;
      }
      // route exports
      switch (key) {
        case 'get':
          method = 'get';
          url = root + name + '/:' + name + '_id';
          break;
        case 'update':
          method = 'post';
          url = root + name + '/:' + name + '_id';
          break;
        case 'create':
          method = 'post';
          url = root + name;
          break;
        case 'batch':
          method = 'post';
          url = root + name + '/batch';
          break;
        case 'index':
          method = 'get';
          url = root + name;
          break;
        default:
          throw new Error('unrecognized route: ' + name + '.' + key);
      }

      // setup
      handler = obj[key];

      // before middleware support
      if (obj.before) {
        parent[method](url, obj.before, handler);
        log('    %s %s -> before -> %s',
            method.toUpperCase(), url, key);
      } else {
        parent[method](url, obj[key]);
        log('    %s %s -> %s', method.toUpperCase(), url, key);
      }
    }
  });
};

