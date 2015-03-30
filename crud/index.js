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
  var dest = 'client/app/admin/';

  var prompts = [
    {
      name: 'dest',
      message: 'What is the path for crud',
      default: dest + this.name
    }
  ];

  this.prompt(prompts, function (props) {
    this.dest = props.dest;
    done();
  }.bind(this));
};

Generator.prototype.createFiles = function createFiles() {
  this.sourceRoot(path.join(__dirname, './templates'));
  ngUtil.processDirectory(this, '.', this.dest);
};
