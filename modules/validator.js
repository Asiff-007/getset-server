'use strict';

var _ = require('lodash'),
  logger = require('./debug')('VALIDATOR'),
  validator = require('validator'),
  validate = function (data, rules) {
    /* validation format
      {
        param: {required: true, min: 40, max: 60, type: 'email', regex: ''}
        predefinedTypes:
          email, number, string, datetime, object, array,
      }
    */
    var errors = {
        required: '{{param}} is required',
        min: '{{param}} should be atleast {{val}}',
        max: '{{param}} shouldn\'t exceed {{val}}',
        type: '{{param}} is not a valid {{val}}',
        regex: '{{param}} doesn\'t match given regex {{val}}'
      },
      error_cache = {},
      replace = function (rule, rule_val, param) {
        return errors[rule]
          .replace('{{param}}', param)
          .replace('{{val}}', rule_val);
      },
      type_methods = function (val, type) {
        switch (type) {
          case 'email':
            return validator.isEmail(val);
          case 'numeric':
            return validator.isNumeric(val);
          case 'alpha':
            return validator.isAlpha(val);
          case 'int':
            return validator.isInt(val);
          case 'object':
            return _.isPlainObject(val);
          case 'array':
            return _.isArray(val);
          case 'string':
            return _.isString(val);
          case 'date':
            return validator.isDate(val);
          case 'bool':
            return _.isBoolean(val);
          case 'float':
            return validator.isFloat(val);
          case 'null':
            return _.isNull(val);
          default:
            throw new Error('undefined type method' + type);
        }
      },
      sanitize = function (val, to) {
        var int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;

        switch (to) {
          case 'int':
            return int.test(val) ? validator.toInt(val, 10) : val;
          case 'float':
            return validator.toFloat(val);
          case 'string':
            return validator.toString(val);
          case 'date':
            return (validator.isDecimal(val) && val > 0) ?
              new Date(parseInt(val, 10)) : validator.toDate(val);
          case 'trim':
            return validator.trim(val);
          case 'email':
            return validator.normalizeEmail(val);
          case 'bool':
            return validator.toBoolean(val);
          default:
            throw new Error('undefined sanitizer ' + to);
        }
      },
      autoSanitize = function (type, val) {
        switch (type) {
          case 'email':
            return sanitize(val, 'email');
          case 'numeric':
            return sanitize(val, 'float');
          case 'alpha':
          case 'string':
            return sanitize(sanitize(val, 'string'), 'trim');
          case 'int':
            return sanitize(val, 'int');
          case 'array':
          case 'object':
          case 'null':
            return val;
          case 'date':
            return sanitize(val, 'date');
          case 'float':
            return sanitize(val, 'float');
          default:
            return sanitize(val, type);
        }
      },
      methods = {
        required: function (val) {
          return !_.isUndefined(val);
        },
        min: function (val, minval) {
          if (_.isNumber(val)) {
            return val >= minval;
          } else if (_.isArray(val) || _.isString(val) || _.isObject(val)) {
            return _.size(val) >= minval;
          } else {
            return false;
          }
        },
        max: function (val, maxval) {
          if (_.isNumber(val)) {
            return val <= maxval;
          } else if (_.isArray(val) || _.isString(val) || _.isObject(val)) {
            return _.size(val) <= maxval;
          } else {
            return false;
          }
        },
        type: function (val, type) {
          return type_methods(val, type);
        },
        regex: function (val, regex) {
          return val.toString().search(regex) > -1;
        }
      },
      validate = function (val, rules, param) {
        var errors;

        if (rules.required || !_.isUndefined(val)) {
          // Check only if value is required or defined
          _.each(rules, function (rule_val, rule) {
            if (rule !== 'canbe_null' && rule !== 'sanitize' &&
              !methods[rule](val, rule_val)) {
              errors = errors || [];
              errors.push(replace(rule, rule_val, param));
            }
          });
        }

        return errors;
      },
      validateData = function (data, rules) {
        var err_obj = {},
          isRule = function (rule) {
            return !_.find(rule, function (val) {
              return _.isObject(val) && !(val instanceof RegExp);
            });
          };

        data = data || {};

        _.each(rules, function (parent_rules, parent_param) {

          var is_array = parent_rules.is_array,
            not_rule = !isRule(parent_rules),
            value = data[parent_param],
            validateArray = function () {
              if (value && !_.isArray(value)) {
                err_obj[parent_param] = 'Value is not array';
              } else {
                _.each(value, function (current, index) {
                  var error = not_rule ? validateData(current, parent_rules) :
                    validateItem(value, index);

                  if (error) {
                    logger.error('type: %s, err: %s, data: %s, current: %s',
                      'Array Validation Failure', error, data, current);

                    value.splice(index, 1);
                  }
                });

                data[parent_param] = value;
              }
            },
            validateItem = function (data_arr, index) {
              var sanitize_to = _.isUndefined(parent_rules.sanitize) ? true :
                  parent_rules.sanitize,
                canbe_null = !!parent_rules.canbe_null,
                type = parent_rules.type,
                param_value = data_arr ? data_arr[index] : value;

              if (canbe_null && _.isNull(param_value)) {
                return;
              }
              // Sanitize if needed before validation
              if (_.isString(sanitize_to)) {
                param_value = sanitize(param_value, sanitize_to);
              } else if (!_.isUndefined(param_value) &&
                _.isBoolean(sanitize_to) && type && sanitize_to) {
                param_value = autoSanitize(type, param_value);
              }

              if (data_arr) {
                data_arr[index] = param_value;
              } else {
                data[parent_param] = param_value;
              }
              return validate(param_value, parent_rules, parent_param);
            },
            error;

          parent_rules = is_array ? _.omit(parent_rules, 'is_array') :
            parent_rules;

          if (not_rule) {
            error = !is_array ? validateData(value, parent_rules) :
              validateArray();

            if (error) {
              err_obj[parent_param] = error;
            }
          } else if (is_array) {
            validateArray();
          } else {
            error = validateItem();
            if (error) {
              err_obj[parent_param] = error;
            }
          }
        });

        return _.isEmpty(err_obj) ? null : err_obj;
      };

    error_cache = validateData(data, rules);

    return {
      data: data,
      validation: {
        validated: _.size(error_cache) === 0,
        errors: error_cache
      }
    };
  },
  express = function (req, res, next) {
    var validationFailure = function (errors) {
      var obj = new Error();

      obj.type = 'Validation Failure';
      logger.error('obj: %s, error: %s', obj, errors);

      res.error(obj);
    };

    req.validate = function (body_rules, param_rules, query_rules) {
      var validate_params = param_rules ?
          validate(req.params, param_rules) : null,
        valid_params = validate_params ? validate_params.validation : null,
        validate_body = body_rules ? validate(req.body, body_rules) : null,
        valid_body = validate_body ? validate_body.validation : null,
        validate_query = query_rules ? validate(req.query, query_rules) : null,
        valid_query = validate_query ? validate_query.validation : null,
        errors = _.map(_.filter([valid_params, valid_body, valid_query],
          function (valid) {
            return valid && !valid.validated;
          }), 'errors');

      req.params = validate_params ? validate_params.data : req.params;
      req.body = validate_body ? validate_body.data : req.body;
      req.query = validate_query ? validate_query.data : req.query;

      if (!_.isEmpty(errors)) {
        validationFailure(errors);
      }

      return _.isEmpty(errors);
    };
    if (next) {
      next();
    }
  };

module.exports = {
  logger: logger,
  validate: validate,
  express: express
};

