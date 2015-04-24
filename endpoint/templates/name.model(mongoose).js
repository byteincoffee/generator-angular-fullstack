'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('node-mongoose-validator');

var <%= classedName %>Schema = new Schema({
  name: String,
  info: String
});

/**
 * Plugins
 */
<%= classedName %>Schema.plugin(require('mongoose-created-at'));
<%= classedName %>Schema.plugin(require('mongoose-updated-at'));
<%= classedName %>Schema.plugin(require('mongoose-delete'));

/**
 * Validations
 */
<%= classedName %>Schema.path('name').validate(validator.notEmpty(), 'Nome não pode ficar em branco');

module.exports = mongoose.model('<%= classedName %>', <%= classedName %>Schema);
