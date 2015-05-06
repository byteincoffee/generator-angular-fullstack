'use strict';

var _ = require('lodash');
var nodemailer = require('nodemailer');
var config = require('../../config/environment');
var recaptcha = require('./../../components/recaptcha');

exports.contact = function (req, res) {

  if (!req.body.name || !req.body.email || !req.body.message || !req.body.recaptcha) {
    return res.send(400);
  }

  recaptcha.verify(req.body.recaptcha, function (success) {
    if (!success) {
      return res.send(400);
    }
    var transporter = nodemailer.createTransport(config.mailer);

    var mailOptions = {
      from: config.mailer.auth.user,
      to: config.contact.to,
      subject: config.contact.subject,
      html: config.contact.body.replace('%name%', req.body.name).replace('%email%', req.body.email).replace('%message%', req.body.message)
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return handleError(res, error);
      } else {
        return res.json(201, info.response);
      }
    });
  });

  function handleError(res, err) {
    return res.send(500, err);
  }
};
