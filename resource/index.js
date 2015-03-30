'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');
var ngUtil = require('../util');
var ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.askFor = function askFor() {
  var done = this.async();
  var name = this.name;

  var base = this.config.get('routesBase') || '/api/';
  var dest = 'client/components/resources/';
  if (base.charAt(base.length - 1) !== '/') {
    base = base + '/';
  }

  // pluralization defaults to true for backwards compat
  if (this.config.get('pluralizeRoutes') !== false) {
    name = name + 's';
  }

  var prompts = [
    {
      name: 'route',
      message: 'What is the url of your api endpoint for resource?',
      default: base + name
    },
    {
      name: 'dest',
      message: 'What is the path for resource',
      default: dest
    }
  ];

  this.prompt(prompts, function (props) {
    if (props.route.charAt(0) !== '/') {
      props.route = '/' + props.route;
    }
    this.route = props.route;
    this.dest = props.dest;

    done();
  }.bind(this));
};

Generator.prototype.createFiles = function createFiles() {
  this.sourceRoot(path.join(__dirname, './templates'));
  ngUtil.processDirectory(this, '.', this.dest);
};
