'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var filterModuleName = require('../../utils/filter-module-name');
var convert = require('../../utils/convert.js');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Enter the service name:',
      default: 'default'
    }, {
      type: 'input',
      name: 'moduleName',
      message: 'Enter the module name:',
      default: 'app.services',
      filter: filterModuleName
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function() {
    var destinationFolder = 'src/' + convert.moduleToFolder(this.props.moduleName);
    var context = {
      moduleName: this.props.moduleName,
      serviceName: toServiceName(this.props.name)
    };

    this.fs.copyTpl(
      this.templatePath('service.js'),
      this.destinationPath(destinationFolder + toFileName(this.props.name)),
      context
    );
  }
});

function toFileName(name) {
  return _.kebabCase(name) + '.service.js';
}

function toServiceName(name) {
  return _.camelCase(name) + 'Service';
}