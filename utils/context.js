'use strict';
var _ = require('lodash');
var path = require('path');
var convert = require(path.resolve(__dirname, './convert.js'));

var context = {
  getDefaults: getDefaults
};

function getDefaults(name, module) {
  var folderName = convert.moduleToFolder(module);
  return _.clone({
    module: module,
    camelName: _.camelCase(name),
    controller: _getController(name, module),
    directive: _.camelCase(name),
    directiveUrl: folderName + _.kebabCase(name) + '.directive.html',
    kebabName: _.kebabCase(name),
    moduleClass: _.kebabCase(module),
    route: _.camelCase(name) + 'Route',
    service: _.camelCase(name) + 'Service',
    state: module.replace('app.modules.', ''),
    templateUrl: folderName + _.kebabCase(name) + '.html'
  });
}

function _getController(name, module) {
  module = module.replace(/app\..*?\./, '');
  return _.upperFirst(_.camelCase(module)) + 'Controller';
}

module.exports = context;
