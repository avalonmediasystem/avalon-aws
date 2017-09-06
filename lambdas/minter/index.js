const uuid = require('uuid/v1');
const util = require('util');
const format = '%s%s-%s%s%s';

exports.handler = (event, context, callback) => {
  var opts = {};
  var node = process.env.NodeID;
  if (!!node) {
    opts.node = node.split('').map(function(x) { return x.charCodeAt() }).slice(0,6);
  }
  var id = uuid(opts);
  var args = id.split('-').reverse();
  args.unshift(format);
  var responseId = util.format.apply(this, args);
  var response = {
    "statusCode": 201,
    "headers": { "x-response-id": responseId },
    "body": "{ \"id\": \"" + responseId + "\" }"
  };
  callback(null, response);
};
