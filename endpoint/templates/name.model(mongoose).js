'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var <%= classedName %>Schema = new Schema({
  name: String,
  info: String
});

<%= classedName %>Schema.plugin(require('mongoose-created-at'));
<%= classedName %>Schema.plugin(require('mongoose-updated-at'));
<%= classedName %>Schema.plugin(require('mongoose-delete'));

module.exports = mongoose.model('<%= classedName %>', <%= classedName %>Schema);
