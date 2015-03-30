'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TextSchema = new Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  type: {type: String, required: true, enum: ['contact', 'about'], unique: true}
});

TextSchema.plugin(require('mongoose-created-at'));
TextSchema.plugin(require('mongoose-updated-at'));

module.exports = mongoose.model('Text', TextSchema);
